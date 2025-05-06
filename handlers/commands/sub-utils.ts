import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { helpCommand } from "../../lib/blocks";
import { logOps, prisma, slackApp } from "../../app";
import {
  Blocks,
  ContextSection,
  MarkdownText,
  PlainText,
  TextSection,
} from "../../lib/block-builder";
import { env } from "process";
import { hostname } from "os";
import { SlackUserTypes } from "../../lib/types";

export const pingOps = async ({
  respond,
  payload,
  say,
  client,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  await respond({
    text: `We're actually up! (running in \`${env.NODE_ENV}\` at \`${hostname}\`)`,
  });
};

export const helpOps = async ({
  respond,
  payload,
  say,
  client,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  await respond({
    blocks: helpCommand,
  });
};

export const statusOps = async ({
  respond,
  payload,
  say,
  client,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  const { text } = payload;
  let entry;
  const params = text.split(" ");

  if (params.length < 2) {
    await respond({
      text: "Missing message ID (either from Slack API or last part of permalinks)"
    })
    return
  }

  // if starts with p, look up by the permalink_message_id string
  if (params[1].startsWith("p")) {
    entry = await prisma.slackLeeks.findFirst({
      where: {
        permalink_message_id: params[1],
      },
    });
    // otherwise, do this instead
  } else {
    entry = await prisma.slackLeeks.findFirst({
      where: {
        message_id: params[1],
      },
    });
  }

  logOps.info(
    `slash-commands:status`,
    `db query for ${params[1]}:`,
    JSON.stringify(entry),
  );

  if (!entry) {
    await respond(
      ":warning: Either that does not exist or you used the last part from the permalink but not yet recorded on our end. If you paste the message ID with any formatting with it, try again pasting without it.",
    );
    return;
  }

  const { permalink } = await client.chat.getPermalink({
    message_ts: entry.message_id,
    channel: entry.channel_id,
  });

  await respond({
    blocks: new Blocks([
      new TextSection(
        new MarkdownText(
          "Here's what we got from our database for this request.",
        ),
        "db_results",
        [
          new MarkdownText("*Message ID*"),
          new MarkdownText(`\`${entry.message_id}\``),
          new MarkdownText("*Permalink to original message*"),
          new MarkdownText(permalink),
          new MarkdownText("*First flagged by*"),
          new MarkdownText(`<@${entry.first_flagged_by}>`),
          new MarkdownText("*Status*"),
          new PlainText(entry.status),
          new MarkdownText("*Rejection reason*"),
          new MarkdownText(
            entry.rejection_reason ? `\`${entry.rejection_reason}\`` : "`None`",
          ),
        ],
      ),
      new ContextSection([
        new MarkdownText(
          "If you use the permalink version of message ID (starts with `p`), this might be inaccurate.",
        ),
        new MarkdownText(`Data accurate as of ${entry.updated_at || 'no data'}, first added on ${entry.created_at || 'no data' }`)
      ]),
    ]).render(),
  });
};

export const whoisLookup = async ({
  respond,
  payload,
  say,
  client,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  //await respond(":warning: `whois` subcommand is currently experimential and may be broken at the moment.")
  const { text } = payload;
  let entry: SlackUserTypes;
  const params = text.split(" ");
  logOps.debug("slash-commands", "params:", params)

  const slackUserLookup = await slackApp.client.users.info({
    user: params[1] || payload.user_id
  })

  if (slackUserLookup.ok == false) {
    await respond(`Something went wrong while looking this user up: \`${slackUserLookup.error}\``)
    return
  }

  if (slackUserLookup.ok == true && slackUserLookup.user.deleted == true) {
    await respond(`User \`${slackUserLookup.user.id}\` (<@${slackUserLookup.user.id}>) is deactivated`)
    return
  }

  entry = await prisma.slackUsers.findUniqueOrThrow({
    where: {
      id: slackUserLookup.user.id
    },
  })

  if (!entry) {
    entry = await prisma.slackUsers.create({
      data: {
        id: slackUserLookup.user.id,
        bot_admin: false,
        is_banned: false,
      }
    })
  }

  function parsePromotedByUserField(
    admin?: SlackUserTypes["promoted_by"]
  ): string {
    if (admin == null || admin == undefined) {
      return "Not an admin"
    }
    if (admin == "system") {
      return "Backend system or database migrations"
    }

    return `<@${admin}> \`${admin}\``
  }

  const blocks = new Blocks([
    new TextSection(
      new PlainText("Here's what we know about you on our records"),
      "whois_lookup",
      [
        new MarkdownText("*User*"),
        new MarkdownText(`<@${slackUserLookup.user.id}> (\`${slackUserLookup.user.id}\`)`),
        new MarkdownText("*Is reviewer/bot admin?*"),
        new PlainText(`${entry.bot_admin}`),
        new MarkdownText("*Promoted by*"),
        new MarkdownText(parsePromotedByUserField(entry.promoted_by)),
        new MarkdownText("*Is banned?*"),
        new MarkdownText(`${entry.is_banned}`),
      ],
    ),
    new ContextSection([
      new MarkdownText(`Data accurate as of ${entry.updated_at || 'no data'}, first known to database on ${entry.created_at || 'no data' }`)
    ])
  ]).render()

  logOps.debug("whois", "blocks", JSON.stringify(blocks))
  await respond({
    blocks
  })
}