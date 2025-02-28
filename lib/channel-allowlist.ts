import { prisma, slackApp } from "../app";
import { queueChannel } from "./constants";
import { isBotInChannel, sendDM, sendEmpheral } from "./utils";

export async function checkIfAllowlisted(channelId: string) {
  const channel = await prisma.slackChannels.findFirst({
    where: {
      id: channelId
    }
  })

  return channel?.allowlisted || false
}

export async function addChannelToAllowlist(channelId: string, admin: string) {
  // look up the channel first
  const channelInfo = await slackApp.client.conversations.info({
    channel: channelId
  })

  // Stop here if the channel does not exist
  if (channelInfo.ok === false) {
    await sendDM(admin, `Channel <#${channelId}> does not exist.`)
    return;
  }

  // Stop here if the channel is private or in a DM.
  if (channelInfo.channel.is_private === true || channelInfo.channel.is_im === true) {
    await sendDM(admin, `Channel <#${channelId}> is private or in a DM.`)
    return;
  }

  let data = await prisma.slackChannels.findFirst({
    where: {
      id: channelId
    }
  })
  const areWeHere = await isBotInChannel(channelId)
  
  if (data === null || data.allowlisted === false || areWeHere === false) {
    await prisma.slackChannels.upsert({
      where: {
        id: channelId
      },
      create: {
        id: channelId,
        allowlisted: true
      },
      update: {
        allowlisted: true
      }
    })

    if (areWeHere === false) {
      await slackApp.client.conversations.join({
        channel: channelId
      })
    }

    await slackApp.client.chat.postMessage({
      channel: queueChannel,
      text: `Channel <#${channelId}> has been allowlisted by <@${admin}> (or is already allowlisted but we're here now)`
    })
  } else if (data.allowlisted === true) {
    await sendDM(admin, `Channel <#${channelId}> is already allowlisted.`)
  }
}

export async function removeChannelFromAllowlist(channelId: string, admin: string) {
  // look up the channel first
  const channelInfo = await slackApp.client.conversations.info({
    channel: channelId
  })

  // Stop here if the channel does not exist
  if (channelInfo.ok === false) {
    await sendDM(admin, `Channel <#${channelId}> does not exist.`)
    return;
  }

  let data = await prisma.slackChannels.findFirst({
    where: {
      id: channelId
    }
  })
  const areWeHere = await isBotInChannel(channelId)

  if (data.allowlisted === true || areWeHere === true) {
    await prisma.slackChannels.update({
      where: {
        id: channelId
      },
      data: {
        allowlisted: false
      }
    })

    if (areWeHere === true) {
      await slackApp.client.conversations.leave({
        channel: channelId
      })
    }

    await slackApp.client.chat.postMessage({
      channel: queueChannel,
      text: `Channel <#${channelId}> has been removed from allowlist by <@${admin}> (or is already blocklisted and the bot left).`
    })

    await sendEmpheral(admin, channelId, `You successfully removed <#${channelId}> from the allowlist.`)
  } else if (data.allowlisted === false) {
    await sendEmpheral(admin, channelId, `Channel <#${channelId}> is already blocklisted.`)
  }
}