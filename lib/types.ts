/**
 * @module
 * Types for the database backend are being worked on here, and currently experimental.
 * For up-to-date schema, please see the [Prisma schema file](../prisma/schema.prisma).
 */

/**
 * The leek flag status states
 */
export enum SlackLeeksStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  FlaggedAsNotLeek = "flagged_as_notleek",
  Ignored = "ignored",
}

/**
 * For up-to-date schema, please see the [Prisma schema file](../prisma/schema.prisma).
 */
export type SlackLeekTypes = {
  message_id: string;
  channel_id: string;
  permalink_message_id?: string;
  leeks_channel_post_id?: string;
  first_flagged_by: string;
  status: SlackLeeksStatus;
  review_queue_id?: string;
  rejection_reason?: string;
  leeks_reacts: number;
  leeks_flags: number;
  is_major_leek: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
};

/**
 * For up-to-date schema, please see the [Prisma schema file](../prisma/schema.prisma).
 */
export type SlackChannelTypes = {
  id: string;
  allowlisted: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
};

/**
 * For up-to-date schema, please see the [Prisma schema file](../prisma/schema.prisma).
 */
export type SlackUserTypes = {
  /**
   * Slack user ID
   */
  id: string;
  /**
   * Whether the user can review leek flags and take other admin tasks
   * at leeks channel.
   */
  bot_admin: boolean;
  /**
   * Slack user ID of the admin who promoted the user in question
   */
  promoted_by?: string
  /**
   * Wheter the user in question is banned or not
   */
  is_banned: boolean;
  ban_reason?: string;
  banned_by?: string;
  banned_at?: Date;
  readonly created_at: Date;
  readonly updated_at: Date;
};
