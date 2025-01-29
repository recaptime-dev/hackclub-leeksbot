import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { generateReviewQueueMessage, helpCommand, permissionDenied } from "../../lib/blocks";
import { botAdmins, queueChannel } from "../../lib/constants";
import { logOps, prisma } from "../../app";
import { detectEnvForChannel, getBaseSlashCommand } from "../../lib/env";
import { Blocks, ContextSection, MarkdownText, PlainText, TextSection } from "../../lib/block-builder";
import { sendDM } from "../../lib/utils";
import { checkIfAdmin } from "../../lib/admin";
import { SlackLeeksStatus } from "../../lib/types";
import { helpOps, pingOps, statusOps } from "./sub-utils";
import { addChannelForLeeks, rmChannelForLeeks } from "./sub-admin";
import { rm } from "fs";

export const botCommandHandler = async ({
  ack,
  respond,
  payload,
  say,
  client,
  context,
  logger,
  next
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  const {text, user_id, channel_id, channel_name} = payload;
  const isThisBotAdmin = await checkIfAdmin(user_id);
  const params = text.split(" ")

  logOps.info(
    "received slash command data:",
    JSON.stringify({
      text,
      user_id,
      channel_id,
      channel_name,
      params,
      isThisBotAdmin
  }))

  // ack first
  await ack()

  const addChannelAliases = [
    "add-channel",
    "add-ch",
    "allowlist-channel",
    "allowlist-ch",
    "allowlist"
  ]
  const rmChannelAliases = [
    "remove-channel",
    "remove-ch",
    "blocklist-channel",
    "blocklist-ch",
    "blocklist"
  ]

  switch (params[0]) {
    case "ping":
      logOps.info("slash-commands:ping", `Received ping command from ${user_id} in ${channel_id} (${channel_name})`)
      await pingOps({ack, respond, payload, say, client, context, logger, next, command: payload, body: payload});
      return;
    case "help":
      logOps.info("slash-commands:help", `Received help command from ${user_id} in ${channel_id} (${channel_name})`)
      await helpOps({ack, respond, payload, say, client, context, logger, next, command: payload, body: payload});
      return;
    case "status":
      logOps.info("slash-commands:status", `Received status command from ${user_id} in ${channel_id} (${channel_name})`)
      await statusOps({ack, respond, payload, say, client, context, logger, next, command: payload, body: payload});
      return;
    case "queue":
      logOps.info("slash-commands:queue", `Received queue command from ${user_id} in ${channel_id} (${channel_name})`)
      return;
    default:
      if (addChannelAliases.includes(params[0])) {
        logOps.info("slash-commands:add-channel", `Received add-channel command from ${user_id} in ${channel_id} (${channel_name})`)
        await addChannelForLeeks({ack, respond, payload, say, client, context, logger, next, command: payload, body: payload});
        return;
      }
      if (rmChannelAliases.includes(params[0])) {
        logOps.info("slash-commands:remove-channel", `Received remove-channel command from ${user_id} in ${channel_id} (${channel_name})`)
        await rmChannelForLeeks({ack, respond, payload, say, client, context, logger, next, command: payload, body: payload});
        return;
      }
      await respond({
        text: `I didn't understand that command or probably unimplemented yet. Try \`${getBaseSlashCommand()} help\`.`
      }); 
      return;
    }
}