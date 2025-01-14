import { App } from "@slack/bolt";
import { eventsRegistry } from "./events";
import { blockActionsRegistry } from "./actions";
import { botComamndsRegistry } from "./commands";
import { msgShortcutRegistry } from "./shortcuts";

export const registerHandlers = (slackApp: App) => {
  eventsRegistry(slackApp);
  blockActionsRegistry(slackApp);
  botComamndsRegistry(slackApp);
  msgShortcutRegistry(slackApp);
}