# Data Privacy for Hack Club Leeks Bot

This page documents about the data privacy pratices the Slack app do for its features, alongside how to access
and delete data in accordance with privacy laws and community pratices in Hack Club Slack as a community project
for transparency.

:::warning
**This page is a work in progress!** It will be reviewed with the HQ staff and Fire Department, alongside
Nest admins before formalizing this data privacy policy.
:::

## Data we collect and how we process/use it

* Slack user ID
  * Used for checking permissions throughout the bot and leek flag notifications as well as for moderation purposes.
* Slack message ID and channel ID
  * Instead of keeping the original message contents (including file attachments) due to privacy reasons, we only keep these
  IDs on the database. These may be pruned off the DB if the originals are deleted by the sender or the Fire Department.

## Where we store and keep the data

These data are kept in a Postgres database hosted on [Hack Club Nest],
a tilde server run by fellow Hack Clubbers hosted on Hetzner. The database schema can be found at
[`prisma/schema.prisma`][schema.prisma] of the bot's sources

## Telemetry data

We use Sentry on the backend for collecting telemetry data as you use the app for purposes of debugging
exceptions in production as well as for measuring performance. Your Slack user ID will be included in
these reports to allow us to contact you in case of bug reports and abuse and only team members and trusted
contributors at Recap Time Squad can access these telemetry data.

For the server logs, only Andrei Jiroh and the Nest admins can access the production systemd user service logs for
Leeks bot.

## How to request data deletion

Leek flags are anonymonized by default by simply counting how many people used the leeks emoji reaction and .
We only keep the user ID of the original flagger for moderation purposes.

If you want to unlink your leek flags from your account, contact Andrei Jiroh via Slack DMs or
via email at `privacy@recaptime.dev`.

[Hack Club Nest]: https://hackclub.app
[schema.prisma]: https://gitlab.com/recaptime-dev/hackclub-leeksbot/-/blob/main/prisma/schema.prisma