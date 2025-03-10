# `@hackclub-community/leeksbot` - Hack Club Leeks Slack app

[![Hack Club](https://badges.api.lorebooks.wiki/badges/hackclub/hackclub?style=flat-square)](https://hackclub.com/slack)

A Slack app for flagging leeks around the Hack Club Slack, with a review queue
to prevent abuse and false postives (you can still forward if it is your thing).
Proudly hosted on [Nest](https://hackclub.app). A @recaptime-dev project for the Hack Club
community, started as @ajhalili2006's pet project.

**Links**: [Documentation][docs] | [meta Slack channel][meta] | [leeks channel][leeks]

[docs]: https://leeksbot.hackclub.lorebooks.wiki
[meta]: https://hackclub.slack.com
[leeks]: https://hackclub.slack.com

**CALLING FOR CONTRIBUTIONS AND MAINTAINERS**: This project is currently a one-man operation in
terms of code maintenance and needs your help to keep it maintained. Learn more in the project's
[contributing guidelines] If you can't support the project by contributing patches and bug
reports, consider [donating to Recap Time Squad] or [help Hack Club Nest admins pay the biils](https://hcb.hackclub.com/donations/start/nest)[^1].

## Context for non-Hack Clubbers

The term `leek` is used among Hack Clubbers to say that they spotted
something being cooked on from the HQ without any announcement whatsoever.
In short, a leak (minus any PII nightmares). For the original usage of the
term, cue from [Wikipedia]:

> A leek is a vegetable, a cultivar of Allium ampeloprasum, the broadleaf wild leek (syn. Allium porrum).
> The edible part of the plant is a bundle of leaf sheaths that is sometimes erroneously called a stem or stalk.

In the [What Hack Club is not] document by Chris Walker of Hack Club HQ:

> **Hack Club is not absolutely transparent**
>
> Hack Club is radically transparent in many ways, but not all information is shared
> with all parties at all times. Most of our code is open source, but not all of it.
> We aspire to be transparent about moderation decisions in the Slack, but sometimes
> details are not released (such as to preserve the privacy or dignity of members).
> Events or initiatives may involve elements of secrecy (usually because surprises are fun).
> If you want to know something but it hasn't been made public, ask about it; you
> aren't *guaranteed* an answer, but frequently information is not shared simply because
> it is impractical to put every possible thing out in the open.

The channel `#hackclub-leeks` was created October 9th, 2023 by Reese Armstrong,
initially called `#hc-site-tracker` and renamed many times in the past to track
changes in Hack Club site (and the `hackclub.dev` domain) with help of other data
and internet sleuths at Hack Club. Fast forward to this day, the channel has been used
to get a sneak peek into upcoming events that the HQ been cooking (even some staff sharing
them) before being officially announced.

The bot development started as a simple Slack workflow made by Andrei Jiroh (Hack Clubber since
Arcade and SABDFL at RecapTime.dev) by sending a link to a possible leek when reacting with
`leek[s]` emoji in selected channels. It is then evolved into the bot in its current form, with
added feature of review queues to ensure nothing go wrong and to avoid troubles with the HQ.

The term `leek` was also seen being used in the wild through the
following instances, as documented by Hack Clubbers:

* TODO: list them here

## Features

- Review queues for the bot admins to avoid false positives, similar to Prox2.
- React with :leeks: or use the `Flag as leek` message action.
- Utility slash commands to track status and to speed up moderation actions for reviewers.

## Privacy Policy and Terms of Use

We only log your Slack user ID in a Postgres database hosted on Hack Club Nest
for moderation efforts and to get notified about the status of your flagged leek. The
bot admins (called Leeks Bot Review Queue team in Hack Club Slack) may reach you out via
DMs to validate your flag or if any moderation actions were taken.

In case of abuse, you may be banned from using the bot and may be reported to the Fire
Department if found breaking [the Hack Club Code of Conduct].

## License

- Code: MPL-2.0
- Documentation at `./docs`: CC-BY-SA-4.0

<!-- links -->
[the Hack Club Code of Conduct]: ./CODE_OF_CONDUCT.md
[the @recaptime-dev GitHub organization]: https://github.com/recaptime-dev
[Recap Time Squad]: https://recaptime.dev
[contributing guidelines]: ./CONTRIBUTING.md
[donating to Recap Time Squad]: https://recaptime.dev/donate
[What Hack Club is not]: https://hackclub.slack.com/files/UDK5M9Y13/F072YGU6A9Z/what_hack_club_is_not.pdf
[See the upcoming project adoption policy]: https://www.canva.com/design/DAGayjcmpbI/YhVYiVUNvcuFwlZaIjoE0w/edit?utm_content=DAGayjcmpbI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
[Wikipedia]: https://en.wikipedia.org/wiki/Leek

<!-- footnotes -->
[^1]: [Nest](https://hackclub.app) is a HQ-funded project and part of [the tildeverse](https://tildeverse.org). Although Hack Club funds the tilde to pay for the dedicated Linux server on Hetzer from donors, please note that the admins are unpaid volunteers and maintain it on their own time.
