# pull shellcheck and hadolint from respective docker images
FROM koalaman/shellcheck:stable as shellcheck
# hadolint ignore=DL3006
FROM hadolint/hadolint as hadolint

FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# see https://github.com/hadolint/hadolint/wiki/DL4006 for context
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# HACK: Use Postgres' official package repos
# hadolint ignore=DL3008
RUN curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc \
    | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg \
   && echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
    > /etc/apt/sources.list.d/pgdg.list \
   && apt-get update \
   && apt-get install --no-install-recommends -y postgresql-client-16 \
   && apt-get clean && rm -rf /var/lib/apt/lists/*

# and dump it here at /usr/local/bin
COPY --from=shellcheck /bin/shellcheck /usr/local/bin/shellcheck
COPY --from=hadolint /bin/hadolint /usr/local/bin/hadolint

# Use devcontainer.json for the rest like Node.js stuff and then some.
