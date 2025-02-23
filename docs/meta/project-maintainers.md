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
    avatar: "https://cdn.andreijiroh.dev/archive/pfps/644129_spBC5UUB.png",
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
    avatar: "https://ca.slack-edge.com/T0266FRGM-U079A6KNYB1-f5e96a823856-512",
    name: "Adrian T",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U079A6KNYB1" },
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U059VC0UDEU-bf73d04ac7fc-512",
    name: "Mahad Kalam (Skyfall)",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U059VC0UDEU" },
      { icon: "github", link: "https://github.com/SkyfallWasTaken"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U07L45W79E1-g7800332736c-512",
    name: "Saahil Dutta (Neon)",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U07L45W79E1" },
      { icon: "github", link: "hhttps://github.com/NeonGamerBot-QK"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U04G40QKAAD-60cdf4a8749a-512",
    name: "Samuel Fernandez",
    title: "Leeks Bot Review Queue team member and Hack Clubber, also Nest admin",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U07CAPBB9B5" },
      { icon: "github", link: "https://github.com/polypixeldev"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U014E8132DB-affd60b53adc-512",
    name: "Shubham Panth",
    title: "Engineering at Hack Club HQ",
    links: [
      { icon: "slack", link: "https://hackclub.slack.com/team/U014E8132DB" },
      { icon: "github", link: "https://github.com/DevIos01"}
    ]
  }
]

// former/inactive team members go here
const alumni = [
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U020X4GCWSF-0862898e16cc-512",
    name: "Rushil",
    title: "Boba Drops Reviewer at Hack Club HQ",
    links: [
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  },
]
</script>

# Project maintainers

These are the people behind the review queue for flagged leeks behind the scenes and those maintaining the codebase.

## Current / Active

These people are currently active in the review queue and code maintenance in the past 3 months:

<VPTeamMembers :members="current" />

## Inactive / Retired

These people are either inactive for at least 3 months or retired from the review queue team and/or project maintainenance.

<VPTeamMembers :members="alumni" />

## How to be a maintainer

To join the `@leeksbot-review-queue-team` user group on Slack and grant you maintainer permissions to the repository, you need to:

* be a active Hack Clubber with at least few hours of coverage between timezones
  * Either as a high schooler or alumni, although I am currently prioritize those currently at school at the moment.
  * People at the HQ/HCB/Fire Department can join to help reviewing flagged leeks to avoid accidentially leaking PII and other things as needed, although please note that this is a community project and not a HQ-sanctioned one.
* proficient in using TypeScript, build Slack apps using Bolt.js and doing database persistence with Prisma ORM
* follow the [RecapTime.dev Community Code of Conduct](https://policies.recaptime.dev/code-of-conduct) and
[Hack Club CoC](https://hackclub.xom/conduct)

If you're up, [contact Andrei Jiroh](https://andreijiroh.dev/contact) on Slack and join `#leeksbot-meta` channel, or file a new issue in the repository's issue tracker. Currently access are given based on trust, recent Slack activity and previous open-source
contributions (or maintainer activity if they are also building)

## Leaving the team

If you are inactive for 3 months straight or on temporary suspension, you may be moved into `Inactive / Retired` section
of this page. Alternatively, you can run `/leeks leave-team` (or `/leeks demote @yourself`). You may be asked to confirm
the action before demoting yourself.
