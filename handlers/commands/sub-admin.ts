import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { checkIfAdmin } from "../../lib/admin";
import { addChannelToAllowlist, checkIfAllowlisted, removeChannelFromAllowlist } from "../../lib/channel-allowlist";
import { logOps } from "../../app";

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
  const params = payload.text.split(" ");
  const isUserAdmin = await checkIfAdmin(payload.user_id);
  const channelIdMatch = payload.text.match(/<#(C\w+)>/);
  const channelId = channelIdMatch ? channelIdMatch[1] : (params[1] || payload.channel_id);

  logOps.info("slash-commands:remove-channel", `user-id: ${payload.user_id}, channel-id: ${channelId}, is-admin: ${isUserAdmin}`);
  // check if the user is an admin
  if (isUserAdmin == false) {
    await respond("You are not authorized to do this.");
    return;
  }

  await removeChannelFromAllowlist(channelId, payload.user_id);
}