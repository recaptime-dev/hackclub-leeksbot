---
description: The people behind the review queue for flagged leeks and those maintaining the codebase
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from "vitepress/theme"

// current project maintainers and reviewers
const current = [
  {
    avatar: "https://cachet.dunkirk.sh/users/U07CAPBB9B5/r",
    name: "Andrei Jiroh Halili",
    title: "RecapTime.dev BDFL, lead maintainer, Hack Club Alumni 2025",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U07CAPBB9B5" },
      { icon: "github", link: "https://github.com/ajhalili2006" },
      { icon: "gitlab", link: "https://gitlab.com/ajhalili2006" },
      { icon: "mastodon", link: "https://tilde.zone/@ajhalili2006" }
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U079A6KNYB1/r",
    name: "Adrian T",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U079A6KNYB1" },
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U059VC0UDEU/r",
    name: "Mahad Kalam (Skyfall)",
    title: "Happenings Newspaper writer",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U059VC0UDEU" },
      { icon: "github", link: "https://github.com/SkyfallWasTaken"}
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U07L45W79E1/r",
    name: "Saahil Dutta (Neon)",
    title: "Zeon bot dev and Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U07L45W79E1" },
      { icon: "github", link: "hhttps://github.com/NeonGamerBot-QK" }
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U04G40QKAAD/r",
    name: "Samuel Fernandez",
    title: "Hack Club Nest admin",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U04G40QKAAD" },
      { icon: "github", link: "https://github.com/polypixeldev"}
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U014E8132DB/r",
    name: "Shubham Panth",
    title: "Engineering at Hack Club HQ",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U014E8132DB" },
      { icon: "github", link: "https://github.com/DevIos01"}
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U080A3QP42C/r",
    name: "3kho",
    title: "furry Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U080A3QP42C" },
      { icon: "github", link: "https://github.com/3kho" },
      { icon: "telegram", link: "https://t.me/echopost" }
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U062UG485EE/r",
    name: "Kieran Klukas",
    title: "leek connoiseur, lead dev for Hackatime and maker of Cachet",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U062UG485EE" },
      { icon: "github", link: "https://github.com/taciturnaxolotl" }
    ]
  },
  {
    avatar: "https://cachet.dunkirk.sh/users/U0829HRSQ76/r",
    name: "PianoMan0",
    title: "Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U0829HRSQ76" },
      { icon: "github", link: "https://github.com/pianoman0" }
    ]
  }
]

// former/inactive team members go here
const alumni = [
    {
    avatar: "https://cachet.dunkirk.sh/users/U020X4GCWSF/r",
    name: "Rushil",
    title: "(formerly) Boba Drops Reviewer at Hack Club HQ",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U020X4GCWSF" },
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  }
]
</script>

# Project maintainers

These are the people behind the review queue for flagged leeks behind the scenes and those maintaining the codebase.

## Current / Active

These people are currently active in the review queue and code maintenance in the past 3 months:

<VPTeamMembers :members="current" />

## Inactive / Retired

These people are either inactive for at least 3 months or retired from the
review queue team and/or project maintainenance. We may move the reviewers into this section in the event of
any moderation action taken for [Code of Conduct violations][hc-coc] and abuse reports.

<VPTeamMembers :members="alumni" />

## How to be a maintainer

To join the `@leeksbot-review-queue-team` user group on Slack and grant you maintainer permissions to the repository, you need to:

- be a active Hack Clubber with at least few hours of coverage between timezones
  - Either as a high schooler or alumni, although I am currently prioritize those currently at school (including homeschoolers) at the moment.
  - People at the HQ/HCB/Fire Department can join to help reviewing flagged leeks to avoid accidentially leaking PII and other things as needed, although please note that this is a community project and not a HQ-sanctioned one.
- proficient in using TypeScript, build Slack apps using Bolt.js and doing database persistence with Prisma ORM
- follow both the [RecapTime.dev Community][rtdev-coc] and
  [Hack Club CoC][hc-coc]

If you're up, [contact Andrei Jiroh][contact] on Slack and join `#leeksbot-meta` channel, or file a new issue in the repository's issue tracker. Currently access are given based on trust, recent Slack activity and previous open-source
contributions (or maintainer activity if they are also building)

## Onboarding

## Offboarding

If you are inactive for 3 months straight or on temporary suspension, you may
be moved into `Inactive / Retired` section of this page. Alternatively, you can
run `/leeks leave-team` (or `/leeks demote @yourself`). You may be asked
to confirm the action before demoting yourself.

When you leave, your maintainer access to the repository may be revoked for
security reasons, as well as Slack app management for both development and
production instances.

[hc-coc]: https://hackclub.com/conduct
[contact]: https://andreijiroh.dev/contact
[rtdev-coc]: https://policies.recaptime.dev/code-of-conduct
