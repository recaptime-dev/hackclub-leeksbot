# Getting started

The main feature of the companion Slack app, flagging messages for possible leeks,
uses both message reactions and message shortcut actions. For the demo screenshots, we [use this message](https://hackclub.slack.com/archives/C01FXNNF6F2/p1735932245359439)
from the personal channel of [~zrl](https:/zachlatta.com) (founder and executive director, Hack Club)

## Via message reactions

React with the `:leek:` or `:leeks:` custom emoji on any channel where the app currently resides.

![Reaction menu pointing to the leeks emoji in Slack](https://cdn.hackclubber.dev/slackcdn/bb5cd8b80cc55eb8f732835fdd022e6e.png)

If you need to, run `/invite @leeksbot` (Slack should automatically
resolve that username to the production instance of the app for you) but it will
be dequeued for being outside our list of approved channels unless reviewed by the reviewers in a private channel.

## Via message shortcut actions

In any message, hover over the message on the desktop and click `More actions` or hold it on mobile to show the options menu then select `More message shortcut`

![A screenshot of a Slack message's context menu pointing to "More message shortcuts..."](https://cloud-pjn7knr4u-hack-club-bot.vercel.app/0image.png)

At the shortcut selector, search for `Flag as leek` from the Hack Club Leeks app (use the production one and not the development instance).

![In the "Use a shortcut" popout, the cursor points toward "Flag as leek" shortcut from the production Slack app.](https://cloud-dqctdna6n-hack-club-bot.vercel.app/0image.png)

## What happens behind the scenes?

The project maintainers, also known as Leeksbot Review Queue team on Slack, will be get notified in a private channel (`#leeksbot-queue` for context)
whether there's being flagged as possible leek. All actions are logged using Slack threads with a Postgres database
on Nest for recording keeping and showing status to everyone via `/leeks status`.

![A typical review queue thread, circa January 2025](https://cdn.hack.pet/slackcdn/8779195e5a52eefff54531eadac27e90.png)

A reviewer may approve a flag either as minor or major leek, reject as non-leek or simply left alone/ignored.
Any changes in status will result in the original flagger being notified via Slack DMs and updated at the database side.
