import type { App } from "@slack/bolt";
import { rejectionReasonHandler } from "./rejection-reason-flow";

export const viewRegistry = (slackApp: App) => {
  slackApp.view("rejection_reason_form", rejectionReasonHandler);
};
