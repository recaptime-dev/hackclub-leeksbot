# InfraOps for Hack Club Leeks bot

Curious about how do we run this Slack bot's backend at all?

## Hosting

## Data persistence

We run our development and production database on Prisma Database under its
own environment to ensure uptime and reliability, even if we run the bot outside Nest.

Initially and in the past, we use Nest Postgres under @ajhalili2006's
account for that.
