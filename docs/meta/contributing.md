# Contributing to the project

Thank you for your interest in contributing into the project! While the codebase is
currently maintained by a single person (like any project at Recap Time Squad)

## Preflight Checklist

* Read and understand the project's [code of conduct](https://gitlab.com/recaptime-dev/hackclub-leeksbot/-/blob/main/CODE_OF_CONDUCT.md) and [our coding style](./code-style.md)
* Agree to the [Developer's Certificate of Origin](https://developercertificate.org/)
(We don't do CLAs here to minimize legal admin headaches with the HCB team.)
* For Hack Clubbers, join the `#leeksbot-meta` channel for coordinating Slack app development.

## More ways to contribute

If writing TypeScript code or documentation is not your thing or can't donate your time for the project,
you can still contribute in other ways:

* **Donate to [Recap Time Squad][hcb-donate] or [Hack Club Nest][hcb-donate-nest].** While we run the bot on Nest
and use Nest Postgres, donating to Recap Time Squad will help us pay biils such as domain renewals and support
the team and infrastructure behind projects like these.
* **Report bugs and submit feature requests in the issue tracker.** You can also suggest and report bugs in the
meta channel, but using GitLab issues is preferred so we can track work in the same place as commits and deployments
happen.
* **Keep finding for leeks in the Slack.** Simply use the bot (or forward to the leeks channel in case of downtime)
as usual.

[hcb-donate]: https://hcb.hackclub.com/donations/start/recaptime-dev
[hcb-donate-nest]: https://hcb.hackclub.com/donations/start/nest

## Setting up Development Environment

In general, we use the latest Node.js LTS (currently `22.x` at the time of writing)
for the runtime and documentation site (via `npm`) and Postgres for data presistence.

### With Nix

::: warning
You need to be inside a `devenv` shell for Prisma Client to work properly on NixOS.
:::

We use [`devenv`](https://devenv.sh) via Nix flakes using the `direnv` integration.
If you do use VS Code, [install its integration](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv)
after installing `direnv` via your NixOS/home-manager configuration or `nix-env -iA nixpkgs.direnv` /
`nix profile install nixpkgs#direnv` (if you have `flakes` experimental feature enabled).

You may be prompted to run `direnv allow` once in order to initialize the dev environment.

### Secrets

Secrets are managed via [`dotenvx`][dotenvx], with both [Doppler] and [1Password] for safely storing the
private keys. If you want to run the dev instance yourself, ask @ajhalili2006 for the value of `DOTENV_PRIVATE_KEY`
in Hack Club Slack (or via email at `ajhalili2006@crew.recaptime.dev`).

### Via Doppler

If you have access to our Doppler workspace (directly or via a service account token), here are the
project and config names you must use when interacting with the Doppler CLI:

### Via 1Password CLi

If you have access to [our 1Password team account][see-handbook], authenicate yourself against
the CLI (by manually signing you with `op account add` or with [desktop app integration]) and run the following
to extract the decryption keys from 1Password:

```bash
op inject -i .env.keys.tmpl -o .env.keys
```

If the CLI says that you don't have access to either the vault or the item itself, try these troubleshooting
steps:

* Sign into RecapTime.dev 1Password team first on your 1Password CLI or desktop app.
* Select your Recap Time Squad crew account on 1Password when prompted at `op signin`. You may need to
reauthenicate or enable CLI integration in developer settings to do so.
* Check if you can access `CI/CD Secrets and InfraOps` vault. If you don't have access, you can ask
Andrei Jiroh for a invite to the team as community contributor or provision you a temporary service
account auth token.
  * If you have provisioned a temporary read-only service account auth token, set its value to the
  `OP_SERVICE_ACCOUNT_TOKEN` variable on your shell session. Keep it in a safe place and do not share
  with anyone.

## Commit message style

We use Conventional Commits to write and format our

## Sending patches

The easy way to send us patches is through GitLab's merge requests web interface (if your patch is on a
seperate branch for those with developer access as contributor or on your own personal fork) or `glab mr` CLI comamnd.

If you prefer to use GitHub instead, we also maintain a mirror at <https://github.com/recaptime-dev/hackclub-leeksbot>
and submit your patches there via `gh pr`.

Alternatively, you can send patches over email at [sourcehut](https://lists.sr.ht/~recaptime-dev/hackclub-leeksbot-patches)
or via `Email a new merge request to this project` link on [GitLab SaaS][merge-request-ops]

[dotenvx]: https://github.com/dotenvx/dotenvx
[see-handbook]: https://wiki.recaptime.dev/handbook/1password
[desktop app integration]: https://developer.1password.com/docs/cli/app-integration/
[merge-request-ops]: https://gitlab.com/recaptime-dev/hackclub-leeksbot/-/merge_requests
[Doppler]: https://doppler.com
[1Password]: https://developer.1password.com
