# InfraOps for Hack Club Leeks bot

Curious about how do we run this Slack bot's backend at all? Read on.

## Hosting

We run the bot in production mode at [Hack Club Nest][nest] with
a systemd user service unit ([sources][systemd-unitfile]).

## Data persistence

We run our development and production database on Prisma Database under its
own environment to ensure uptime and reliability, even if we run the bot outside Nest.

Initially and in the past, we use Nest Postgres under @ajhalili2006's
account for that.

## SecretOps

We store `.env` files encrypted via [`dotenvx`][dotenvx]

[dotenvx]: https://github.com/dotenvx/dotenvx
[systemd-unitfile]: https://gitlab.com/recaptime-dev/hackclub-leeksbot/-/blob/9053a50a4d526cf2b3568354fc05c1d0fdc9c0b4/lib/systemd/prod-nest.service
[nest]: https://hackclub.app
