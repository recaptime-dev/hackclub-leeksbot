import * as fs from "fs";
import * as YAML from "yaml";
import { WebClient } from "@slack/web-api";
import { config } from "../lib/env";
import { ConsoleLogger } from "@slack/logger";

const logOps = new ConsoleLogger();
logOps.setName("leeksbot");

// detect environment for manifest file selection
function detectEnvType() {
  if (config.env == "production") {
    return "prod";
  } else {
    return "dev";
  }
}

const client = new WebClient(config.slack.botToken);
const file = fs.readFileSync(`../manifests/${detectEnvType()}.yml`, "utf8");
const manifest = YAML.parse(file);

(async () => {
  try {
    logOps.info("app-manifest-update", `attempting to update app manifest for ${config.slack.appId}`)
    const result = await client.apps.manifest.update({
      manifest,
      app_id: config.slack.appId,
      token: config.slack.appToken,
    });
    logOps.info("app-manifest-update", result)
    return result;
  } catch (error) {
    logOps.error("app-manifest-update", "Something went wrong while updating", error.code, error.data);
    process.exit(1);
  }
})();
