import { AllMiddlewareArgs, BlockButtonAction, SlackCommandMiddlewareArgs, SlackEventMiddlewareArgs, SlashCommand } from "@slack/bolt";
import { slackApp } from "../app";
import Sentry from "./sentry";
import { ChatPostEphemeralArguments, ReactionAddedEvent, ReactionRemovedEvent, WebClient } from "@slack/web-api";

/**
 * Extracts the last part of Slack message permalink through some regex.
 * Note that this code is AI-assisted via plain Google Gemini (not
 * Gemini Code Assist in Google Cloud Platform).
 * 
 * Note that since this could break things at the database side if we received
 * a leek through a message inside the thread, but we'll fix that later.
 * 
 * @param permalinkUrl The full message permalink from Slack
 * @returns 
 */
export function extractPermalink(permalinkUrl) {
  const url = new URL(permalinkUrl);
  const pathname = url.pathname.split('/');
  const lastPathSegment = pathname[pathname.length - 1];
  if (lastPathSegment.startsWith('p')) {
    return lastPathSegment;
  }
}

/**
 * A utility function to easily sending a DM to someone without needing to doing
 * `client.conversations.open` first (it'll do that for you behind the scenes).
 * @param user Slack user ID
 * @param data Either a string or a object following `client.chat.postMessage` parameters in Bolt.js
 * @returns 
 */
export async function sendDM(user: string, data: string | object) {
  try {
    const {channel: imChannelData} = await slackApp.client.conversations.open({
      users: user
    })
  
    let postMessageData: any = {
      channel: imChannelData.id,
    }
  
    if (typeof data == "string") {
      postMessageData.text = data
    } else if (typeof data == "object") {
      Object.assign(postMessageData, data)
    }
  
    return await slackApp.client.chat.postMessage(postMessageData)
  } catch (error) {
    throw Error(error)
  }
}

export async function sendEmpheral(user: string, channel: string, data: string | object) {
  try {
    let postEphemeralData: ChatPostEphemeralArguments = {
      channel,
      user,
      attachments: []
    }
    
    if (typeof data == "string"){
      postEphemeralData.text = data
    } else if (typeof data == "object") {
      Object.assign(postEphemeralData, data)
    }
    
    await slackApp.client.chat.postEphemeral(postEphemeralData)
  } catch (error) {
    throw Error(error)
  }
}


/**
 * Utility function to get the Slack app's bot user ID, mainly used to check if the bot
 * in question is in a specific channel via {@linkcode isBotInChannel}.
 * @returns 
 */
export async function getBotUserId() {
  const {user_id} = await slackApp.client.auth.test()
  return user_id
}

/**
 * Check if the bot is in a specified Slack channel by its ID.
 * @param channelId Slack channel ID
 * @returns Returns true if the bot is there, returns false otherwise.
 */
export async function isBotInChannel(channelId: string) {
  const botUserId = await getBotUserId()
  const {members} = await slackApp.client.conversations.members({
    channel: channelId
  })

  return members.includes(botUserId)
}

/**
 * Utility function to catch an exception from a Slack event and report it to Sentry with the
 * necessary metadata for backend telemetry, then reply to the user with a generic error message.
 * 
 * @param data The event data that caused the error
 * @param client The WebClient instance from Bolt.js
 * @param error The error object
 */
export async function catchExceptionAndReplyError(
  data: ReactionAddedEvent | ReactionRemovedEvent | SlashCommand | BlockButtonAction,
  client: WebClient,
  error: any)
{
  // check if it is an "acknowledged" error which means a client has already
  // done some of the acknowledged steps already
  if (error instanceof Error && error.name === "acknowledged") {
    return;
  }

  if ('command' in data && 'user_id' in data && 'channel_id' in data) {
    await client.chat.postEphemeral({
      channel: data.channel_id,
      user: data.user_id,
      text: `An error occurred while processing your command. The error has been reported to the developers.`
    })
  }

  const tags = {
    channel: undefined,
    user: undefined,
    message: undefined,
    trigger_id: undefined,
    value: undefined,
    action_id: undefined,
    command: undefined,
    reaction: undefined,
  }

  if ('reaction' in data && 'item' in data) {
    tags.reaction = data.reaction
    tags.channel = data.item.channel
    tags.message = data.item.ts
  } else if ('actions' in data && 'channel' in data && 'message' in data) {
    tags.trigger_id = data.trigger_id
    tags.value = data.actions[0].value
    tags.action_id = data.actions[0].action_id
    tags.channel = data.channel.id
    tags.user = data.user
    tags.message = data.message
  } else if ('command' in data && 'user_id' in data && 'channel_id' in data) {
    tags.command = data.command
    tags.channel = data.channel_id
    tags.user = data.user_id
  }

  Sentry.captureException(error, {
    extra: {
      data,
    },
    tags,
    user: tags.user
  });
}