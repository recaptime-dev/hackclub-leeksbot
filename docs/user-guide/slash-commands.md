# Slash commands

:::warning
List is currently incomplete or may mention features under development at the moment,
try `/leeks help` for the full list of currently available commands.
:::

The Slack app's slash command is `/leeks` (`/leeks-dev` for the development instance),
and mostly used for administrative actions or utility purposes only.

## utility

### help

**Usage**: `/leeks help`

Show help message, including available commands and link to this docs site.

### ping

**Usage**: `/leeks ping`

Check if the bot is responding or not. If something wrong, notify Andrei Jiroh
in the `#leeksbot-meta` Slack channel.

Since it is hosted on Nest, be on the look out for any downtimes at `#nest-status`.

### status

**Usage**: `/leeks status <message_id>`

#### Parameters

* `message_id` **(required)** - Slack message ID (either in its thread/message ID via API or from the message permalinks starting with `p`)

## admin only

### allowlist-channel

**Usage**: `/leeks allow`

**Aliases**: `allowlist`, `allowlist-channel`

Add the current channel to the allowlist and make the bot join the channel if public (unless manually invited).

### blocklist-channel

**Usage**: `/leeks block`

**Aliases**: `blocklist-channel`, `blocklist`

Remove the current channel's allowlist status and make the bot leave the channel if there.
