/*
  Warnings:

  - You are about to drop the column `leeksFlagCount` on the `SlackLeeks` table. All the data in the column will be lost.
  - You are about to drop the column `leeksReact` on the `SlackLeeks` table. All the data in the column will be lost.
  - Made the column `banned_by` on table `SlackUsers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SlackChannels" ADD COLUMN     "allowlisted_by" TEXT NOT NULL DEFAULT 'system';

-- AlterTable
ALTER TABLE "SlackLeeks" DROP COLUMN "leeksFlagCount",
DROP COLUMN "leeksReact",
ADD COLUMN     "leeks_flags" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "leeks_reacts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rejection_reason" TEXT;

-- AlterTable
ALTER TABLE "SlackUsers" ADD COLUMN     "promoted_by" TEXT NOT NULL DEFAULT 'system',
ALTER COLUMN "banned_by" SET DEFAULT 'system';
