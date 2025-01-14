# Contributing to the project

Thank you for your interest in contributing into the project! While the codebase is
currently maintained by a single person

## Preflight Checklist

* Read and understand the project's [code of conduct](https://github.com/andreijiroh-dev/leeksbot/blob/3bbf018b3a7fb6d18f1a49b6e097c318c80d5cc5/CODE_OF_CONDUCT.md)
* Agree to the [Developer's Certificate of Origin](https://developercertificate.org/)
(We don't do CLAs here to minimize legal admin headaches with the HCB team.)
* For Hack Clubbers, join the `#leeksbot-meta` (app dev and project meta discusions) and the main `#hackclub-leeks` channel.

## Setting up Development Environment

In general, we use the latest Node.js LTS (currently `22.x` at the time of writing)
for the runtime and documentation site (via `npm`) and Postgres for data presistence.

### With Nix

::: warning
Currently Prisma Client seems to be broken inside our Nix setup and is
researching workarounds on that.
:::

We use [`devenv`](https://devenv.sh) via Nix flakes using the `direnv` integration.
If you do use VS Code, [install its integration](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv) after installing
`direnv` via your NixOS/home-manager configuration or `nix-env -iA nixpkgs.direnv` /
`nix profile install nixpkgs#direnv` (if you have `flakes` experimental feature).
