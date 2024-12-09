import { useGuessStore } from "@/stores/guess";
import { Page, useAppStore } from "@/stores/app";

import { sendMessage } from "@/utils/messages";

import { InitialDataEvent } from "@shared/types/message";
import { MessageHandler } from "@/types/message";

export const onInitialDataEvent: MessageHandler<InitialDataEvent> = ({ message }) => {
  const { user, dbUser, dbPost } = message.data;

  const appStore = useAppStore();
  const guessStore = useGuessStore();

  appStore.user = user;
  appStore.dbUser = dbUser;

  if (dbPost) {
    guessStore.dbPost = dbPost;

    // Find if the user has already completed the post or not
    const playedPost = dbUser?.playedPosts.find(({ id }) => id === dbPost.id);
    const isPostCompleted = Boolean(playedPost?.completedAt);

    if (isPostCompleted) {
      appStore.navigateTo(Page.SUMMARY);
    } else {
      appStore.navigateTo(Page.GUESS);
    }
  }

  appStore.loading = false;

  sendMessage({
    type: "LOADED_EVENT",
  });
};
