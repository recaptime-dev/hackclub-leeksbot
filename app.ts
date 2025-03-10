import { App, ExpressReceiver, LogLevel } from '@slack/bolt';
import { registerHandlers } from './handlers';
import { config } from './lib/env';
import { PrismaClient } from "@prisma/client";
import { env } from 'process';
import { ConsoleLogger } from '@slack/logger';
import { botAdmins, queueChannel } from './lib/constants';
import { sendDM } from './lib/utils';
import { IncomingMessage, ServerResponse } from 'http';
import { ParamsIncomingMessage } from '@slack/bolt/dist/receivers/ParamsIncomingMessage';
import Sentry from './lib/sentry';
import("./lib/sentry.js")

// Globals
export const prisma = new PrismaClient();
export const logOps = new ConsoleLogger()
const routerKit = new ExpressReceiver({
  signingSecret: config.slack.sigSecret,
  logger: logOps
})
export const slackApp = new App({
  token: config.slack.botToken,
  appToken: config.slack.appToken,
  logLevel: env.LOGOPS_DEBUG !== undefined ? LogLevel.DEBUG : LogLevel.INFO,
  socketMode: config.slack.socketMode,
  receiver: config.slack.socketMode ? undefined : routerKit,
});

registerHandlers(slackApp);
logOps.setLevel(env.LOGOPS_DEBUG !== undefined ? LogLevel.DEBUG : LogLevel.INFO);
logOps.setName("leeksbot");

// HTTP routes (only enabled if socket mode is disabled)
if (config.slack.socketMode !== true) {
  routerKit.router.get("/", (_req: ParamsIncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const redirect = "Redirecting you to <a href='https://leeksbot.hackclub.lorebooks.wiki'>docs in a moment</a>"
    res.writeHead(301, {
      "content-length": Buffer.byteLength(redirect),
      location: "https://leeksbot.hackclub.lorebooks.wiki"
    }).end(redirect)
  })

  routerKit.router.get("/ping", (req: ParamsIncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const message = "leeksbot is running here now"
    res.statusCode = 200
    res.statusMessage = message
    res.setHeaders(new Headers({
      "Content-Type": "text/plain",
      "content-length": Buffer.byteLength(message).toString()
    })).end(message)
  })
}

(async () => {
  try {
    // connect to db first before bolt.js
    await prisma.$connect();

    // then do the rest
    await slackApp.start({
      port: config.port
    });
    logOps.info("slackAppBase", `⚡️ Bolt app now up and running`);
    if (config.slack.socketMode !== true) logOps.info("API server now reachable at port", config.port)
    
    // notify @ajhalili2006 (or the first person on env.SLACK_APP_MANAGERS) when the bot is up
    await sendDM(config.slack.appManagers[0], process.env.NODE_ENV == "production" ? "Leeks bot is now online in nest!" : "Leeks bot is now online! (development, apologies for spamming if this annoys you)")
  } catch (error) {
    // if something gone wrong, notify then exit
    Sentry.captureException(error);
    logOps.error("slackAppBase", "Error during startup", error)
    await slackApp.client.chat.postMessage({
      channel: queueChannel,
      text: `Something went wrong during startup (also logged at Sentry):\n\`\`\`\n${error}\n\`\`\``,
      mrkdwn: true
    })
    logOps.debug
    await slackApp.stop()
    await prisma.$disconnect()
    process.exit(1)
  }
})();