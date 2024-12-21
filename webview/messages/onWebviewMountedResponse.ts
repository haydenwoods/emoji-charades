import { useAppStore } from "@/stores/app";

import { MessageHandler } from "@/types/message";
import { WebviewMountedResponse } from "@shared/types/message";

export const onWebviewMountedResponse: MessageHandler<WebviewMountedResponse> = (message) => {
  if (!message.data) return;
  const { user, player, playerXP, playerRank, puzzle, puzzleSummary } = message.data;

  const appStore = useAppStore();

  appStore.user = user;
  appStore.player = player;
  appStore.playerXP = playerXP;
  appStore.playerRank = playerRank;

  if (puzzle) {
    appStore.puzzle = puzzle;
    appStore.puzzleSummary = puzzleSummary;
  }

  appStore.loading = false;
  appStore.navigateTo(appStore.mainPage);
};
