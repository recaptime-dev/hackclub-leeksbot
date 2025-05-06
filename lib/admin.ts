import { logOps, prisma, slackApp } from "../app";
import {
  Blocks,
  HeaderSection,
  MarkdownText,
  PlainText,
  TextSection,
} from "./block-builder";
import { metaChannel, queueChannel, queueTeam } from "./constants";
import { sendDM } from "./utils";


/**
 * Get a list of current review queue team members via Slack API
 * @returns Array of Slack user IDs from the API
 */
export async function getCurrentAdmins(): Promise<String[]> {
  const admins = await slackApp.client.usergroups.users.list({
    usergroup: queueTeam,
  });

  return admins.users;
}

/**
 * Queries against the DB for Slack users with `bot_admin` flag set to `true`,
 * via `prisma.slackUsers.findMany` method in Prisma Client.
 * @returns Array of Slack user IDs from the DB
 */
export async function getCurrentAdminsFromDb(): Promise<String[]> {
  const admins = await prisma.slackUsers.findMany({
    where: {
      bot_admin: true,
    },
    cacheStrategy: {
      tags: ["userLookup"],
      ttl: 300,
      swr: 15
    }
  });

  return admins.map((admin) => admin.id);
}

/**
 * An async function for checking if a Slack user by ID is an review queue team member.
 * @param userId Slack user ID in question
 * @returns Boolean for admin status, currently fetched from DB via Prisma to avoid over-reliance with Slack APIs
 */
export async function checkIfAdmin(userId: string): Promise<boolean> {
  const user = await prisma.slackUsers.findFirst({
    where: {
      id: userId,
    },
    cacheStrategy: {
      tags: ["userLookup"],
      ttl: 300,
      swr: 15
    }
  });

  // log DB result for debugging in production
  logOps.info(
    "checkIfAdmin",
    `Checking if ${userId} is an admin: ${user?.bot_admin || false}`,
  );

  if (user !== null) {
    return user.bot_admin || false;
  } else {
    return false;
  }
}

export async function addAdmin(userId: string, actor: string) {
  const subteamUsers = await getCurrentAdmins()

  if (subteamUsers.includes(userId)) {
    await sendDM(actor, `User <@${userId}> is already an admin`)
    return
  }

  const result = await prisma.slackUsers.upsert({
    where: {
      id: userId,
    },
    create: {
      id: userId,
      bot_admin: true,
      promoted_by: actor,
    },
    update: {
      bot_admin: true,
      is_banned: false,
      banned_at: null,
      banned_by: null,
      promoted_by: actor,
    },
  });

  await sendDM(
    userId,
    `You have been promoted as bot admin for leeksbot by <@${actor}>. You should be invited into <#${queueChannel}> and added to <!subteam^${queueTeam}> shortly after this message`,
  );

  // Correctly build the user string for Slack API
  const updatedUsers = subteamUsers.concat([userId]);
  const usersString = updatedUsers.join(',');

  await slackApp.client.usergroups.users.update({
    usergroup: queueTeam,
    users: usersString,
  });

  return result
}

export async function removeAdmin(userId: string, actor: string) {
  if (!(await checkIfAdmin(userId))) {
    await sendDM(actor, `User <@${userId}> is not currently an member of <!subteam^${queueTeam}>.`)
    return;
  }

  const currentUsers = await getCurrentAdmins()
  const updatedUsers = currentUsers.filter((user) => user !== userId)
  const usersString = updatedUsers.join(',');

  await slackApp.client.usergroups.users.update({
    usergroup: queueTeam,
    users: usersString,
  });

  const result = await prisma.slackUsers.update({
    where: {
      id: userId,
    },
    data: {
      bot_admin: false,
    },
  });

  return result;
}

export async function checkIfUserBanned(userId: string) {
  const user = await prisma.slackUsers.findFirst({
    where: {
      id: userId,
    },
    cacheStrategy: {
      tags: ["userLookup"],
      ttl: 300,
      swr: 15
    }
  });

  return user.is_banned || false;
}

export async function banUser(userId: string, admin: string, reason?: string) {
  const status = (await prisma.slackUsers.findFirst({
    where: { id: userId },
    cacheStrategy: {
      tags: ["userLookup"],
      ttl: 300,
      swr: 15
    }
  })).is_banned;

  // Make sure to check if that user ID exists on Slack first
  const user = await slackApp.client.users.info({
    user: userId,
  });
  if (user.ok === false) {
    await sendDM(
      admin,
      `User <@${userId}> does not exist on Slack. Please check the user ID and try again.`,
    );
    return;
  }

  // prepare db data for updating an entry
  const data = {
    is_banned: true,
    banned_at: new Date(),
    banned_by: admin,
    reason: reason || "No reason provided",
  };

  if (status === false) {
    const result = await prisma.slackUsers.update({
      where: {
        id: userId,
      },
      data
    });

    // notify user about the ban
    await sendDM(userId, {
      blocks: new Blocks([
        new HeaderSection(
          new PlainText("You have been banned from using Leeksbot"),
          "warning",
        ),
        new TextSection(
          new MarkdownText(
            `You have been banned by <@${admin}> for the following reason: ${reason}`,
          ),
        ),
        new TextSection(
          new MarkdownText(
            `If you believe this is a mistake, please contact the admins via DMs or at the <#${metaChannel}> channel.`,
          ),
        ),
      ]).render(),
    });
    await slackApp.client.chat.postMessage({
      channel: queueChannel,
      blocks: new Blocks([
        new HeaderSection(new PlainText("Ban notification"), "warning"),
        new TextSection(new MarkdownText(`*User*: <@${userId}>`)),
        new TextSection(new MarkdownText(`*Banned by*: <@${admin}>`)),
        new TextSection(new MarkdownText(`*Reason*: ${reason}`)),
      ]).render(),
    });

    return result;
  }
}

export async function unbanUser(userId: string, admin: string) {
  const status = (await prisma.slackUsers.findFirst({
    where: { id: userId },
  })).is_banned;

  // Make sure to check if that user ID exists on Slack first
  const user = await slackApp.client.users.info({
    user: userId,
  });
  if (user.ok === false) {
    await sendDM(
      admin,
      `User <@${userId}> does not exist on Slack. Please check the user ID and try again.`,
    );
    return;
  }

  if (status === true) {
    const result = await prisma.slackUsers.update({
      where: {
        id: userId,
      },
      data: {
        // just set the ban status to false while keeping the
        // last ban data for historical reasons until overwriten
        // by the next ban
        is_banned: false,
      },
    });

    // notify user about the ban
    await sendDM(userId, {
      blocks: new Blocks([
        new HeaderSection(
          new PlainText("You have been unbanned from using Leeksbot"),
          "warning",
        ),
        new TextSection(
          new MarkdownText(
            `You have been unbanned by <@${admin}>. You can now use Leeksbot again.`,
          ),
        ),
      ]).render(),
    });

    await slackApp.client.chat.postMessage({
      channel: queueChannel,
      blocks: new Blocks([
        new HeaderSection(new PlainText("Ban notification"), "warning"),
        new TextSection(new MarkdownText(`*User*: <@${userId}>`)),
        new TextSection(new MarkdownText(`*Unbanned by*: <@${admin}>`)),
      ]).render(),
    });
  }
}
