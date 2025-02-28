import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hack Club Leeks",
  description: "The companion Slack app for all the leeks in Hack Club Slack",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: '/user-guide/getting-started', activeMatch: '^/user-guide/' },
      { 
        text: 'Meta',
        activeMatch: '^/meta/',
        items: [
          { text: 'Allowlisted channels', link: '/meta/allowlisted-channels' },
          { text: 'Data Privacy', link: '/meta/data-privacy' },
          { text: 'Project Maintainers', link: '/meta/project-maintainers' },
          { text: 'Contributing to the project', link: '/meta/contributing' },
          { text: 'Coding style', link: '/meta/code-style' }
        ]
      },
    ],

    sidebar: [
      {
        text: 'User Guide',
        items: [
          { text: 'Getting Started', link: '/user-guide/getting-started' },
          { text: "Slash commands", link: '/user-guide/slash-commands' }
        ]
      },
      {
        text: "Reference / Meta",
        items: [
          {
            text: "Allowlisted channels",
            link: "/meta/allowlisted-channels"
          },
          {
            text: "Data Privacy",
            link: "/meta/data-privacy"
          },
          {
            text: "Project Maintainers",
            link: "/meta/project-maintainers"
          },
          {
            text: "Contributing to the project",
            link: "/meta/contributing"
          },
          {
            text: "Coding style",
            link: "/meta/code-style"
          }
        ]
      }
    ],

    editLink: {
      pattern: 'https://gitlab.com/-/ide/project/recaptime-dev/hackclub-leeksbot/edit/main/-/docs/:path',
      text: 'Edit this page on GitLab SaaS (via Web IDE)'
    },

    socialLinks: [
      { icon: "hackclub", link: "https://hackclub.com/?ref=leeksbot" },
      { icon: "slack", link: "https://hackclub.slack.com/archives/C07T2EP4PLZ" },
      { icon: 'github', link: 'https://github.com/recaptime-dev/hackclub-leeksbot' },
      { icon: "gitlab", link: "https://gitlab.com/recaptime-dev/hackclub-leeksbot" }
    ],

    footer: {
      copyright: "Copyright © 2025-present Recap Time Squad and contributors",
      message: "Released under the MPL-2.0 license for the code and CC-BY-SA-4.0 for the docs."
    },

    // show last updated timestamp
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        timeStyle: 'short',
        dateStyle: 'medium',
        hour12: false
      }
    },
  },

  // set base URL and make sure URLs are clean
  cleanUrls: true,
  sitemap: {
    hostname: 'https://leeksbot.hackclub.lorebooks.wiki',
  },

  markdown: {
    cache: true,
    config(mdit) {
      mdit.use(footnote)
    },
  },

  outDir: "../public"
})
