---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Hack Club Leeks App"
  text: "The companion app for all the leeks"
  tagline: In the Hack Club Slack
  image:
    src: /assets/img/leeksbot-main-logo.png
    alt: The leeksbot Slack app logo
  actions:
    - theme: brand
      text: Get started
      link: /user-guide/getting-started
    - theme: alt
      text: Join the leeks channel
      link: https://hackclub.slack.com/archives/C06089401GT

features:
  - title: Discreetly submit possible leeks
    details: By using the dedicated Flag as possible leek message action without the leek reaction.
  - title: Get notified as it goes through the review queue
    details: "Or checking its status via <code>/leeks status [message_id]</code> slash command"
  - title: "Proudly hosted on <a href='https://hackclub.app'>Hack Club Nest</a>"
    details: With reproducible environments powered by <a href="https://devenv.sh">devenv</a> and Nix.
---

## History

For the uninitialized (especially for new Hack Clubbers), the term `leek` 
([originally a vegetable], specifically the Allium ampeloprasum scientifically speaking)
is used to say that something from the HQ is being cooked behind the scenes and
either spotted in the wild or leeked by a HQ staff themselves, hence a leak.
This exclues any personal information related nightmares for obvious data privacy reasons.

The leeks channel in [Hack Club] [Slack workspace][slack] is much older than the Slack app
(or its original incration as a Slack workflow) as it is created by Reese Armstrong, a
former confessions reviewer (due to reasons of political differences between him and HQ
staff, see [the history of this debacle][ban-context] for context) and a progressive activist, in

[Hack Club]: https://hackclub.com
[slack]: https://hackclub.com/slack
[originally a vegetable]: https://en.wikipedia.org/wiki/Leek
[ban-context]: 
