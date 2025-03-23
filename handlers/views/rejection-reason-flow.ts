import type { AllMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';
import { logOps, prisma, slackApp } from "../../app"; 
import { checkIfAdmin } from '../../lib/admin';
import { ActionsSection, Blocks, ButtonAction, ContextSection, MarkdownText, PlainText, TextSection } from '../../lib/block-builder';
import { permissionDenied } from '../../lib/blocks';
import { catchExceptionAndReplyError, slackEventLogger } from '../../lib/utils';
import { SlackLeeksStatus } from '../../lib/types';
import { queueChannel } from '../../lib/constants';

export const rejectionReasonHandler = async (
  { ack, view, body, client}: AllMiddlewareArgs & SlackViewMiddlewareArgs
) => {
  slackEventLogger("rejection_reason", body, "views")
  const { user } = body
  const message_id = Object.keys(view.state.values)[0]
  const rejection_reason = view.state.values[`${message_id}`]["rejection_reason"].value // technically bananas
  
  try {
    await ack()

    if (!await checkIfAdmin(user.id)) {
      await client.views.update({
        view_id: view.id,
        hash: view.hash,
        view: {
          type: "modal",
          title: new PlainText("Permission denied").render(),
          blocks: permissionDenied
        }
      })
      return
    }

    let entry = await prisma.slackLeeks.findFirst({
      where: {
        message_id
      }
    })

    let messageTemplate = `Hey <@${entry.first_flagged_by}>! Your leek flag was denied by <@${user.id}>. If you have questions, please reach out to the review queue team if you have questions.`

    if (rejection_reason) {
      messageTemplate + `\n\nThe rejection reason provided is: \`${rejection_reason}\``
    }

    // get conversation ID for a user on DMs
    const { channel: imChannelData } = await client.conversations.open({
      users: entry.first_flagged_by
    })

    let originalMessageEmbeds = (await slackApp.client.conversations.history({
      channel: queueChannel,
      latest: entry.review_queue_id,
      inclusive: true,
      include_all_metadata: true,
      limit: 1
    })).messages[0]


    if (entry.status == SlackLeeksStatus.Rejected) {
      entry = await prisma.slackLeeks.update({
        where: {
          message_id
        },
        data: {
          rejection_reason
        }
      })
    } else if (entry.status == SlackLeeksStatus.Pending) {
      entry = await prisma.slackLeeks.update({
        where: {
          message_id
        },
        data: {
          rejection_reason,
          status: "rejected"
        }
      })

      // update review queue message first and reply
      await client.chat.update({
        channel: queueChannel,
        ts: entry.review_queue_id,
        blocks: [
          originalMessageEmbeds.blocks[0],
          originalMessageEmbeds.blocks[1],
          originalMessageEmbeds.blocks[2],
          originalMessageEmbeds.blocks[3],
          new TextSection(new MarkdownText(`:x: Denied by <@${user.id}>`)).render(),
          new ActionsSection([
            new ButtonAction(
              new PlainText("Edit rejection reason", true),
              entry.message_id,
              "update_denial_reason"
            ),
            new ButtonAction(
              new PlainText("Requeue", true),
              entry.message_id,
              "queue_for_review"
            )
          ]),
          new ContextSection([
            new MarkdownText(`Original message ID on database: \`${entry.message_id}\``)
          ]).render()
        ]
      })
      await client.chat.postMessage({
        channel: queueChannel,
        thread_ts: entry.review_queue_id,
        text: `:x: Denied by <@${user.id}> with reason \`${rejection_reason ?? "no reason provided"}\``,
        blocks: new Blocks([
          new TextSection(new MarkdownText(`:x: Denied by <@${user.id}> with reason \`${rejection_reason ?? "no reason provided"}\``))
        ]).render()
      })

      await client.chat.postMessage({
        channel: imChannelData.id,
        text: messageTemplate
      })
    }
  } catch (error) {
    await catchExceptionAndReplyError(body, client, error)
  }
}