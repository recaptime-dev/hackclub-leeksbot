import { env } from "node:process"
import { leeksChannel, testingCenter } from "./constants"

/**
 * BotEnvConfig is the configuration object for the bot.
 */
type BotEnvConfig = {
  /**
   * Environment name, mainly used for logging
   */
  env: string,

  /**
   * Postgres database URL string (managed via `dotenvx`)
   */
  db?: string,

  port: number,

  slack: {
    botToken?: string,
    appToken?: string
    /**
     * Usually set to `true in development instances of the bot (managed via `dotenvx`)
     */
    socketMode: boolean,
    /**
     * Used in production for validating incoming requests to the bot from Slack
     */
    sigSecret: string,
    /**
     * A list of Slack user IDs assinged as app managers, seperated by spaces.
     * 
     * For a more up-to-date list, see the collaborators page [for production app](https://app.slack.com/app-settings/T0266FRGM/A07QFDAV272/collaborators)
     * or [for development app](https://app.slack.com/app-settings/T0266FRGM/A07RLJB27M1/collaborators).
     */
    appManagers: string[]
  }

  sentry: {
    // used for error tracking/backend telemetry, defaults to @recaptime-dev's Sentry project
    dsn: string
  }
}

export const config: BotEnvConfig = {
  env: env.NODE_ENV || "development",
  db: env.DATABASE_URL,
  port: Number(env.PORT) || 6023,
  slack: {
    botToken: env.SLACK_BOT_TOKEN,
    appToken: env.SLACK_APP_TOKEN,
    socketMode: env.NODE_ENV != "production",
    sigSecret: env.SLACK_SIGNING_SECRET,
    appManagers: env.SLACK_APP_MANAGERS?.split(" ") || [
      "U07CAPBB9B5",
      "U07L45W79E1",
      "U04G40QKAAD",
      "U04CBLNSVH6"
    ]
  },
  sentry: {
    dsn: env.SENTRY_DSN || "https://86feb85b378437aca113d95292a505cf@o1146989.ingest.us.sentry.io/4508580657102848"
  }
}

export function detectEnvForChannel() {
  if (config.env == "production") {
    return leeksChannel
  } else {
    return testingCenter
  }
}

export function getBaseSlashCommand() {
  if (config.env == "production") {
    return `/leeks`
  } else {
    return `/leeks-dev`
  }
}