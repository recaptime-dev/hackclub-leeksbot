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

We're still cooking up the documentation at the moment, but at least this is up before the end of [High Seas](https://highseas.hackclub.com).
