import type {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs
} from "@slack/bolt"
import { leeksReactionEmojis, metaChannel, queueChannel, queueTeam } from "../../lib/constants";
import { detectEnvForChannel, getBaseSlashCommand } from "../../lib/env";
import { logOps, prisma, slackApp } from "../../app";
import { dequeuedMessage, generateReviewQueueMessage } from "../../lib/blocks";
import { extractPermalink, sendDM } from "../../lib/utils";
import { checkIfAllowlisted } from "../../lib/channel-allowlist";

export const leeksReactionCb = async ({
  client,
  event
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"reaction_added">) => {
  const { item, reaction, user, event_ts } = event
  const isChannelAllowlisted = await checkIfAllowlisted(item.channel)

  logOps.info("Received reaction data: ", JSON.stringify({
    item,
    user,
    reaction,
    event_ts,
    isChannelAllowlisted
  }))

  const permalink = (await slackApp.client.chat.getPermalink({
    channel: item.channel,
    message_ts: item.ts
  })).permalink

  if (item.channel === detectEnvForChannel()) return;
  if (!leeksReactionEmojis.includes(reaction)) return;

  let entry = await prisma.slackLeeks.findFirst({
    where: {
      message_id: item.ts
    }
  })

  if (entry === null) {
    entry = await prisma.slackLeeks.create({
      data: {
        message_id: item.ts,
        channel_id: item.channel,
        leeks_reacts: 1,
        first_flagged_by: user,
        status: isChannelAllowlisted === true ? "pending" : "dequeued",
        permalink_message_id: extractPermalink(permalink)
      }
    })
  } else {
    entry = await prisma.slackLeeks.update({
      where: {
        message_id: item.ts
      },
      data: {
        leeks_reacts: entry.leeks_reacts + 1
      }
    })
  }

  if (entry.status == "pending") {
    if (!entry.review_queue_id || entry.review_queue_id == "deleted") {
      const review = await client.chat.postMessage({
        channel: "C07RS0CEQPP",
        blocks: await generateReviewQueueMessage(
          item.ts,
          item.channel,
          user,
          "reaction")
      });

      await prisma.slackLeeks.update({
        where: {
          message_id: item.ts
        },
        data: {
          review_queue_id: review.ts
        }
      })
    }

    await sendDM(
      user,
      `Hey there, we have received your leek flag (message ID: \`${item.ts}\`) for review by an admin. Expect another message here for any updates.`
    )
  } else if (entry.status == "dequeued") {
    if (!entry.review_queue_id || entry.review_queue_id == "deleted") {
      const dequeued = await client.chat.postMessage({
        channel: queueChannel,
        blocks: dequeuedMessage(entry.message_id)
      })

      await prisma.slackLeeks.update({
        where: {
          message_id: item.ts,
        },
        data: {
          review_queue_id: dequeued.ts
        }
      })
    }
    await sendDM(
      user,
      `You reacted to a message (ID: \`${entry.message_id}\`) in this channel but it is none of our <https://leeksbot.hackclub.lorebooks.wiki/meta/allowlisted-channels|allowlisted channels>. We still logged it on the database just in case.`
    )
  } else if (entry.status == "rejected") {
    await sendDM(user,
      `The message (ID: \`${entry.message_id}\`) you're trying to flag as leek via reaction was rejected by Leeks Bot Review Queue team (<!subteam^${queueTeam}>). If this is a mistake, please contact one of them via DMs or at <#${metaChannel}> channel.`
    )
  }
}

export const leeksReactionRemovalCb = async ({
  client,
  event
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"reaction_added">) => {
  const { item, reaction, user, event_ts } = event
  const isChannelAllowlisted = await checkIfAllowlisted(item.channel)

  logOps.info("Received reaction data: ", JSON.stringify({
    item,
    user,
    reaction,
    event_ts,
    isChannelAllowlisted
  }))

  if (item.channel === detectEnvForChannel()) return;
  if (!leeksReactionEmojis.includes(reaction)) return;

  let entry = await prisma.slackLeeks.findFirst({
    where: {
      message_id: item.ts
    }
  })

  // if it is not in our database yet, ignore for now but we will soon.
  if (entry == null) return;

  entry = await prisma.slackLeeks.update({
    where: {
      message_id: item.ts
    },
    data: {
      leeks_reacts: entry.leeks_reacts - 1
    }
  })
}