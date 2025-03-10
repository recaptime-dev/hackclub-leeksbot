/**
 * Slack user IDs for Leeks bot for admin features (such as deleting false
 * positives). If you need them, you must be the one of app collaborators or
 * part of @leeks-review-queue-team user group on Hack Club Slack.
 * (ping ~ajhalili2006 via #ajhalili2006-lair or #hackclub-leeks channel)
 * 
 * If you opt to add your Slack user ID here as part of a merge request or
 * email patch
 * 
 * @deprecated No longer used in the codebase since we're using the Postgres backend, 
 * but kept for historical reasons.
 */
export const botAdmins = [
  "U07CAPBB9B5", // ~ajhalili2006
  "U04G40QKAAD", // ~polypixeldev
  "U079A6KNYB1", // ~ssmidge
  "U059VC0UDEU", // ~skyfall
  "U06TBP41C3E", // ~dainfloop
  "U020X4GCWSF", // ~wolfgamer2
  // TODO: Add FD team members and Nest admins here
];

/**
 * The custom emoji IDs for the #hackclub-leeks channel.
 */
export const leeksReactionEmojis = [
  "leeks",
  "leek"
]

/**
 * List of allowlisted channels to be monitored by Leeks bot on flags.
 * 
 * @deprecated No longer used in the codebase since we're using the Postgres backend,
 * although kept for historical reasons.
 */
export const allowlistedChannels = [
  "C0C78SG9L", // Hack Club HQ
  "C05SVRTCDGV", // HQ general engineering chat
  "CN523HLKW", // HCB Support channel
  "C054QL5JHU0", // HCB-specific dev chat
  "C0710J7F4U9", // YSWS meta channel
  "C01FXNNF6F2", // this is a bit tempting to look around Zach's channel here
  "C06RPCQH482", // Nest?
  "C016DEDUL87", // #cdn
  "C07JBB1QVBN", // #hcb-tracker
  "C07UN8A2Q7Q" // #high-seas-hcb-tracker
]

/**
 * The Slack channel ID of #hackclub-leeks itself
 */
export const leeksChannel = "C06089401GT";

/**
 * The Slack channel ID of #recaptime-dev:hackclub.slack.com's testing channel
 * for testing Slack API features and friends.
 */
export const testingCenter = "C08FJBC7TA9"

/**
 * The queue channel for Leeks bot to send notifications about flags and
 * other important messages.
 */
export const queueChannel = "C07RS0CEQPP";

/**
 * The channel ID of the #leeksbot-meta channel.
 */
export const metaChannel = "C07T2EP4PLZ";

/**
 * The Slack user group ID for the quque team.
 */
export const queueTeam = "S07SN8KQZFC";