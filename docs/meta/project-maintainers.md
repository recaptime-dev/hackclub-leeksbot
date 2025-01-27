---
description: The people behind the review queue for flagged leeks and those maintaining the codebase
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from "vitepress/theme"

const leeksbot_maintainers = [
  {
    avatar: "https://cdn.andreijiroh.dev/archive/pfps/644129_spBC5UUB.png",
    name: "Andrei Jiroh Halili",
    title: "RecapTime.dev BDFL, lead maintainer, Hack Club Alumni 2025",
    links: [
      { icon: "github", link: "https://github.com/ajhalili2006" },
      { icon: "mastodon", link: "https://tilde.zone/@ajhalili2006" }
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U020X4GCWSF-0862898e16cc-512",
    name: "Rushil",
    title: "Boba Drops Reviewer at Hack Club HQ",
    links: [
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U079A6KNYB1-f5e96a823856-512",
    name: "Adrian T",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "github", link: "https://github.com/WolfGamer2"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U059VC0UDEU-bf73d04ac7fc-512",
    name: "Mahad Kalam (Skyfall)",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "github", link: "https://github.com/SkyfallWasTaken"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U07L45W79E1-g7800332736c-512",
    name: "Neon",
    title: "Leeks Bot Review Queue team member and Hack Clubber",
    links: [
      { icon: "github", link: "hhttps://github.com/NeonGamerBot-QK"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U04G40QKAAD-60cdf4a8749a-512",
    name: "Samuel Fernandez",
    title: "Leeks Bot Review Queue team member and Hack Clubber, also Nest admin",
    links: [
      { icon: "github", link: "https://github.com/polypixeldev"}
    ]
  },
  {
    avatar: "https://ca.slack-edge.com/T0266FRGM-U014E8132DB-affd60b53adc-512",
    name: "Shubham Panth",
    title: "Engineering at Hack Club HQ",
    links: [
      { icon: "github", link: "https://github.com/DevIos01"}
    ]
  }
]
</script>

# Project maintainers

These are the people behind the review queue for flagged leeks behind the scenes and those maintaining the codebase.

## Current / Active

<VPTeamMembers :members="leeksbot_maintainers" />

## Inactive / Retired

These maintainers are either inactive for at least 3 months or retired from the review queue team and/or project maintainenance.

## Joining the maintainers team

To join the `@leeksbot-review-queue-team` user group on Slack and grant you maintainer permissions to the repository, you need to:

* be a active Hack Clubber with at least few hours of coverage between timezones
  * People at the HQ/HCB/Fire Department can join to help reviewing flagged leeks to avoid accidentially leaking PII and other things as needed.
* proficient in using TypeScript and build Slack apps using Bolt.js
* follow the [Community Code of Conduct](https://policies.recaptime.dev/code-of-conduct) and [Hack Club CoC](https://hackclub.xom/conduct)

If you're up, [contact Andrei Jiroh](https://andreijiroh.dev/contact), join `#leeksbot-meta` channel, or file a new issue in the repository's issue tracker.
