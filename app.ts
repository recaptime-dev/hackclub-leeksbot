import { App, ExpressReceiver, LogLevel } from '@slack/bolt';
import { registerHandlers } from './handlers';
import { config, detectEnvForChannel } from './lib/env';
import { PrismaClient } from "@prisma/client";
import { env } from 'process';
import { ConsoleLogger } from '@slack/logger';
import { botAdmins, queueChannel } from './lib/constants';
import { sendDM } from './lib/utils';
import("./lib/sentry.js")

// Globals
export const prisma = new PrismaClient();
export const logOps = new ConsoleLogger()
export const slackApp = new App({
  token: config.slack.botToken,
  appToken: config.slack.appToken,
  signingSecret: config.slack.sigSecret,
  logLevel: env.LOGOPS_DEBUG !== undefined ? LogLevel.DEBUG : LogLevel.INFO,
  socketMode: config.slack.socketMode,
  customRoutes: [
    {
      path: "/",
      method: ["GET"],
      handler(req, res) {
        const redirect = "Redirecting to <a href='https://mau.dev/andreijiroh-dev/leeksbot'>https://mau.dev/andreijiroh-dev/leeksbot</a>"
        res.writeHead(301, {
          "content-length": Buffer.byteLength(redirect),
          location: "https://mau.dev/andreijiroh-dev/leeksbot"
        }).end(redirect)
      }
    },
    {
      path: "/ping",
      method: ["GET"],
      handler(req, res) {
        const message = "leeksbot is running here now"
        res.statusCode = 200
        res.statusMessage = message
        res.setHeaders(new Headers({
          "Content-Type": "text/plain",
          "content-length": Buffer.byteLength(message).toString()
        }))
      },
    }
  ]
});

registerHandlers(slackApp);

(async () => {
  logOps.setLevel(env.LOGOPS_DEBUG !== undefined ? LogLevel.DEBUG : LogLevel.INFO);
  logOps.setName("leeksbot");
  
  try {
    // connect to db first before bolt.js
    await prisma.$connect();

    // then do the rest
    await slackApp.start(config.port);
    logOps.info("slackAppBase", `⚡️ Bolt app now up and running`);
    if (config.slack.socketMode !== true) logOps.info("API server now reachable at port", config.port)
    
    // notify @ajhalili2006 when the bot is up
    await sendDM(botAdmins[0], process.env.NODE_ENV == "production" ? "Leeks bot is now online in nest!" : "Leeks bot is now online! (development, apologies for spamming if this annoys you)")
  } catch (error) {
    console.error('Something went wrong during startup - ', error);
    await slackApp.stop()
    await prisma.$disconnect()
  }
})();