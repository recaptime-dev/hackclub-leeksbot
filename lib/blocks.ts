import { ActionsSection, Blocks, ButtonAction, ContextSection, DividerSection, HeaderSection, MarkdownText, PlainText, TextSection } from "./block-builder";
import { slackApp } from "../app";
import { detectEnvForChannel, getBaseSlashCommand } from "./env";
import { metaChannel, queueTeam } from "./constants";

export const helpCommand = [
  new HeaderSection(new PlainText("Help commands for leeksbot")).render(),
  new TextSection(new MarkdownText("Most of the commands here are either used as utility or reserved to bot admins only.")).render(),
  new DividerSection().render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} help\` - show this help message`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} ping\` - check if the bot is online`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} status <message_id>\` - get status of a message on the review queue`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} queue <message_id>\` - queue a message for review`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} nuke-from-leeks <message_id>\` - remove an approved leek from the channel`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} allowlist-channel\` - add current channel to the allowlist`)).render(),
  new TextSection(new MarkdownText(`\`${getBaseSlashCommand()} blocklist-channel\` - remove current channel from the allowlist`)).render(),
  new DividerSection().render(),
  new TextSection(new MarkdownText("If you found any bugs, please report it in #leeksbot-meta channel or via the <https://gitlab.com/recaptime-dev/hackclub-leeksbot/issues|issue tracker>")).render()
]

export const generateReviewQueueMessage = async (
  msg_id: string,
  channel_id: string,
  user_id: string,
  method: "reaction" | "msg_action" | "requeued"
) => {
  const { permalink } = await slackApp.client.chat.getPermalink({
    channel: channel_id,
    message_ts: msg_id
  })

  let submissionMethod: string = "unknown";

  if (method == "reaction") {
    submissionMethod = "Leeks reaction";
  } else if (method == "msg_action") {
    submissionMethod = "Flag as leeks message reaction";
  } else if (method == "requeued") {
    submissionMethod = "Requeued back from backburner";
  }

  return new Blocks([
    new HeaderSection(new PlainText("New possible leek for review")),
    new TextSection(new MarkdownText(`*Link to original message*: ${permalink}`)),
    new TextSection(new MarkdownText(`*Flagged by*: <@${user_id}>`)),
    new TextSection(new MarkdownText(`*Method*: ${submissionMethod}`)),
    new ActionsSection([
      new ButtonAction(
        new PlainText(":true: Approve and post", true),
        msg_id,
        "approve_leek"
      ),
      new ButtonAction(
        new PlainText("Flag as major leek", true),
        msg_id,
        "approve_leek_major"
      ),
      new ButtonAction(
        new PlainText(":x: Deny", true),
        msg_id,
        "deny_leek"
      )
    ]),
    new ContextSection([
      new MarkdownText(`Original message ID on database: \`${msg_id}\``)
    ])
  ]).render()
}

export const dequeuedMessage = (
  msg_id: string,
) => {
  return new Blocks([
    new HeaderSection(new PlainText("Possible leek but dequeued")),
    new TextSection(new MarkdownText("We're not showing the metadata for this one because the original message is posted outside the allowlisted channels.")),
    new TextSection(new MarkdownText(`To add back to the review queue, run \`${getBaseSlashCommand()} queue ${msg_id}\` or press the *Add to review queue* button below and the bot will add it back to the queue.`)),
    new ActionsSection([
      new ButtonAction(
        new PlainText("Add to review queue"),
        msg_id,
        "queue_for_review"
      ),
      new ButtonAction(
        new PlainText("Ignore"),
        msg_id,
        "ignore_leek"
      )
    ]),
    new ContextSection([
      new MarkdownText(`Original message ID on database: \`${msg_id}\``)
    ])
  ]).render()
}

export const permissionDenied = new Blocks([
  new TextSection(new MarkdownText(":x: You are not allowed to use this feature. This is either reserved for bot admins or you're banned from using the bot.")),
  new TextSection(new MarkdownText(`If you think this is a mistake, please contact one of the bot admins (<!subteam^${queueTeam}>) via DMs or at <#${metaChannel}> channel`))
]).render()

// TODO: Use this when triggered in a private channel.
export const dontUseItHere = new Blocks([
  new TextSection(new MarkdownText(`*You probably don't want to use it here, right?* We blocked usage of this message action on <#${detectEnvForChannel()}> and in DMs/private channels.`))
]).render()