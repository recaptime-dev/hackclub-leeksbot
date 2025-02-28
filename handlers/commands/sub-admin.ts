import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { addAdmin, checkIfAdmin } from "../../lib/admin";
import { addChannelToAllowlist, checkIfAllowlisted, removeChannelFromAllowlist } from "../../lib/channel-allowlist";
import { logOps, prisma } from "../../app";
import { permissionDenied } from "../../lib/blocks";
import { catchExceptionAndReplyError } from "../../lib/utils";

export async function addChannelForLeeks({
  ack,
  respond,
  payload,
  say,
  client,
  context,
  logger,
  next
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) {
  const params = payload.text.split(" ");
  const isUserAdmin = await checkIfAdmin(payload.user_id);
  const channelIdMatch = payload.text.match(/<#(C\w+)>/);
  const channelId = channelIdMatch ? channelIdMatch[1] : (params[1] || payload.channel_id);

  logOps.info("slash-commands:add-channel", `user-id: ${payload.user_id}, channel-id: ${channelId}, is-admin: ${isUserAdmin}`);
  // check if the user is an admin
  if (isUserAdmin == false) {
    await respond("You are not authorized to do this.");
    return;
  }

  await addChannelToAllowlist(channelId, payload.user_id);
}

export async function rmChannelForLeeks({
  ack,
  respond,
  payload,
  say,
  client,
  context,
  logger,
  next
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) {
  try {
    const params = payload.text.split(" ");
    const isUserAdmin = await checkIfAdmin(payload.user_id);
    const channelIdMatch = payload.text.match(/<#(C\w+)>/);
    const channelId = channelIdMatch ? channelIdMatch[1] : (params[1] || payload.channel_id);
  
    logOps.info("slash-commands:remove-channel", `user-id: ${payload.user_id}, channel-id: ${channelId}, is-admin: ${isUserAdmin}`);
    // check if the user is an admin
    if (isUserAdmin == false) {
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        user: payload.user_id,
        blocks: permissionDenied,
      })
      return;
    }
  
    await removeChannelFromAllowlist(channelId, payload.user_id);
  } catch (error) {
    await catchExceptionAndReplyError(payload, client, error) 
  }
}

export async function promoteUser({
  ack,
  respond,
  payload,
  say,
  client,
  context,
  logger,
  next
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) {
  const params = payload.text.split(" ");
  const isUserAdmin = await checkIfAdmin(payload.user_id);
  const userIdMatch = payload.params[0].match(/<@(U\w+)>/);

  try {
    if (isUserAdmin == false) {
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        user: payload.user_id,
        blocks: permissionDenied,
      })
      return
    }

    const userData = await prisma.slackUsers.findFirst({
      where: {
        id: userIdMatch ? userIdMatch[1] : params[1]
      }
    })

    if (userData.bot_admin == true) {
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        user: payload.user_id,
        text: `This user is already an admin, you can't promote this user again.`
      })
      return;
    }

    await addAdmin(userIdMatch ? userIdMatch[1] : params[1], payload.user_id)
  } catch (error) {
    await catchExceptionAndReplyError(payload, client, error)
  }
}