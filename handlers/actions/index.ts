import { App } from "@slack/bolt";
import {
  addToQueueHandler,
  approveLeekFlag,
  denyLeekFlag,
  denyLeekFlagModal,
  ignore_leek,
  undoApproveLeek,
} from "./review-queue";

export const blockActionsRegistry = (app: App) => {
  // buttons
  app.action("approve_leek", approveLeekFlag);
  app.action("approve_leek_major", approveLeekFlag);
  app.action("deny_leek", denyLeekFlagModal);
  app.action("update_denial_reason", denyLeekFlagModal);
  app.action("queue_for_review", addToQueueHandler);
  app.action("delete", undoApproveLeek);
  app.action("ignore_leek", ignore_leek);
};
