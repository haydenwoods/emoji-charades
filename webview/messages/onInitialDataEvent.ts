import { Page, useAppStore } from "@/stores/app";

import { sendMessage } from "@/utils/messages";

import { InitialDataEvent } from "@shared/types/message";
import { MessageHandler } from "@/types/message";

export const onInitialDataEvent: MessageHandler<InitialDataEvent> = ({ message }) => {
  const { user, player, puzzle } = message.data;

  const appStore = useAppStore();

  appStore.user = user;
  appStore.player = player;

  if (puzzle) {
    appStore.puzzle = puzzle;

    // Find if the user has already completed the post or not
    const playedPost = player?.completedPuzzles.find(({ id }) => id === puzzle.id);
    const isPostCompleted = Boolean(playedPost?.completedAt);

    if (isPostCompleted) {
      appStore.navigateTo(Page.PUZZLE_SUMMARY);
    } else {
      appStore.navigateTo(Page.GUESS_PUZZLE);
    }
  }

  appStore.loading = false;

  sendMessage({
    type: "LOADED_EVENT",
  });
};
