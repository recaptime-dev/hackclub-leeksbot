import type { AllMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';
import { logOps, prisma } from "../../app"; 
import { checkIfAdmin } from '../../lib/admin';
import { PlainText } from '../../lib/block-builder';
import { permissionDenied } from '../../lib/blocks';
import { catchExceptionAndReplyError } from '../../lib/utils';
import { SlackLeeksStatus } from '../../lib/types';

export const rejectionReasonHandler = async (
  { ack, view, body, client}: AllMiddlewareArgs & SlackViewMiddlewareArgs
) => {
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
    }
  } catch (error) {
    await catchExceptionAndReplyError(body, client, error)
  }
}