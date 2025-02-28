---
description: Learn more about the why and the how do we allowlist channels for flagging leeks.
---

# Allowlisted channels

We usually allowlist public channels that are managed by HQ staff or related to HQ-led or
affilated projects and programs (think of the YSWS programs, anything related to HQ and HCB
and community projects), alongside channels of interest from the perspective of the review
queue team. To ensure that nothing go wrong and avoid accidential PII leakage,
we enable leeks flagging on a per-channel basis.

## Requirements

In order for a channel to be allowlisted for use of leek flagging, a Slack channel in
Hack Club Slack must be:

* publicly accessible (a.k.a. no private channels and group DMs)
* must be affliated with the HQ
  * YSWS program channels usually count here, but it must be officially sponsored/run by a HQ staff
  * eligiability for HQ staff's personal channels may vary, but we look at how prominent
  they are (e.g. `#zrl-land` for Zach Latta himself)
* are considered by community in terms of interest (e.g. `#new-channels` although it may
dox people who create channels and then get them private)

Due to Slack API limitations and Hack Club HQ's [restrictions on data scraping/mining] [^1] for
community-built Slack apps, we can't natively forward messages via the API nor store the
original message contents in database and keep file attachments somewhere else.

[restrictions on data scraping/mining]: https://hackclub.slack.com/archives/C0188CY57PZ/p1727208216604979
[^1]: The thread we linked is not necessarily the policy itself, but

## How to request?

You can request a public channel to be allowlisted for leeks flagging at the
`#leeksbot-meta` Slack channel or via the issue tracker. Note that once a
public channel becomes private, the bot should remove the allowlist status
on the next flag.

## Can I still flag things outside of the allowlist?

You can still, but it will be dequeued by default as it is not yet allowlisted:

![Notification via DMs](https://cdn.hack.pet/slackcdn/781c5e00d31b15a8d4c6ef35135a2396.png)

On our side, this would be look like in the review queue channel, with two buttons either to add it back
to the queue or just make it vanish.

![admin side](https://cdn.fluff.pw/slackcdn/c6877cfea11427ff6a477fd0d1a1621c.png)
