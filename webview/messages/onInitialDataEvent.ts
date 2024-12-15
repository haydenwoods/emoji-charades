import { useAppStore } from "@/stores/app";

import { sendMessage } from "@/utils/messages";

import { InitialDataEvent } from "@shared/types/message";
import { MessageHandler } from "@/types/message";

export const onInitialDataEvent: MessageHandler<InitialDataEvent> = (message) => {
  const { user, player, playerXP, playerRank, puzzle, puzzleSummary } = message.data;

  const appStore = useAppStore();

  appStore.user = user;
  appStore.player = player;
  appStore.playerXP = playerXP;
  appStore.playerRank = playerRank;
  appStore.puzzle = puzzle;
  appStore.puzzleSummary = puzzleSummary;

  appStore.loading = false;
  appStore.navigateTo(appStore.mainPage);

  sendMessage({
    type: "LOADED_EVENT",
  });
};
