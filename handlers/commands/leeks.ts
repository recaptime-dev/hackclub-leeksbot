import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { helpCommand } from "../../lib/blocks";
import { logOps } from "../../app";
import { getBaseSlashCommand } from "../../lib/env";
import { checkIfAdmin } from "../../lib/admin";
import { pingOps, statusOps } from "./sub-utils";
import { addChannelForLeeks, rmChannelForLeeks } from "./sub-admin";
import Sentry from "../../lib/sentry";

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
  const params = text.split(" ")
  try {
    const isThisBotAdmin = await checkIfAdmin(user_id);
  
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
        await respond({
          blocks: helpCommand
        })
        return
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
  } catch (error) {
    Sentry.captureException(error)
  }
}