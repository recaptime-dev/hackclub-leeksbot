import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { helpCommand } from "../../lib/blocks";
import { logOps } from "../../app";
import { getBaseSlashCommand } from "../../lib/env";
import { checkIfAdmin } from "../../lib/admin";
import { pingOps, statusOps, whoisLookup } from "./sub-utils";
import { addChannelForLeeks, rmChannelForLeeks } from "./sub-admin";
import { catchExceptionAndReplyError, slackEventLogger } from "../../lib/utils";

export const botCommandHandler = async ({
  ack,
  respond,
  payload,
  say,
  client,
  context,
  logger,
  next,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  const { text, user_id, channel_id, channel_name } = payload;
  const params = text.split(" ");
  try {
    const isThisBotAdmin = await checkIfAdmin(user_id);

    slackEventLogger("leeks", payload, "slash_comamnds");

    // ack first
    await ack();

    const addChannelAliases = [
      "add-channel",
      "add-ch",
      "allowlist-channel",
      "allowlist-ch",
      "allowlist",
    ];
    const rmChannelAliases = [
      "remove-channel",
      "remove-ch",
      "blocklist-channel",
      "blocklist-ch",
      "blocklist",
    ];

    switch (params[0]) {
      case "ping":
        logOps.info(
          "slash-commands:ping",
          `Received ping command from ${user_id} in ${channel_id} (${channel_name})`,
        );
        await pingOps({
          ack,
          respond,
          payload,
          say,
          client,
          context,
          logger,
          next,
          command: payload,
          body: payload,
        });
        return;
      case "help":
        logOps.info(
          "slash-commands:help",
          `Received help command from ${user_id} in ${channel_id} (${channel_name})`,
        );
        await respond({
          blocks: helpCommand,
        });
        return;
      case "status":
        logOps.info(
          "slash-commands:status",
          `Received status command from ${user_id} in ${channel_id} (${channel_name})`,
        );
        await statusOps({
          ack,
          respond,
          payload,
          say,
          client,
          context,
          logger,
          next,
          command: payload,
          body: payload,
        });
        return;
      case "queue":
        logOps.info(
          "slash-commands:queue",
          `Received queue command from ${user_id} in ${channel_id} (${channel_name})`,
        );
        return;
      case "whois":
        logOps.info(
          "slash-commands:whois",
          `Received whois command from ${user_id} in ${channel_id} (${channel_name})`);
        await whoisLookup({
          ack,
          respond,
          payload,
          say,
          client,
          context,
          logger,
          next,
          command: payload,
          body: payload,
        })
        return;
      default:
        if (addChannelAliases.includes(params[0])) {
          logOps.info(
            "slash-commands:add-channel",
            `Received add-channel command from ${user_id} in ${channel_id} (${channel_name})`,
          );
          await addChannelForLeeks({
            ack,
            respond,
            payload,
            say,
            client,
            context,
            logger,
            next,
            command: payload,
            body: payload,
          });
          return;
        }
        if (rmChannelAliases.includes(params[0])) {
          logOps.info(
            "slash-commands:remove-channel",
            `Received remove-channel command from ${user_id} in ${channel_id} (${channel_name})`,
          );
          await rmChannelForLeeks({
            ack,
            respond,
            payload,
            say,
            client,
            context,
            logger,
            next,
            command: payload,
            body: payload,
          });
          return;
        }
        await respond({
          text: `I didn't understand that command or probably unimplemented yet on the backend. Try \`${getBaseSlashCommand()} help\` or <https://leeksbot.hackclub.lorebooks.wiki/user-guide/slash-commands|see the docs>.`,
        });
        return;
    }
  } catch (error) {
    logOps.error(
      "slash-commands:handler",
      `Error in slash-commands handler from ${user_id} in ${channel_id} (${channel_name})`,
      error,
    );
    await catchExceptionAndReplyError(payload, client, error);
  }
};
