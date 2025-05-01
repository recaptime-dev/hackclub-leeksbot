-- AlterTable
ALTER TABLE "SlackUsers" ALTER COLUMN "banned_by" DROP DEFAULT,
ALTER COLUMN "promoted_by" DROP NOT NULL,
ALTER COLUMN "promoted_by" DROP DEFAULT;
