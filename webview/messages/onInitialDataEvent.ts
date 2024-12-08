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

  // If there is post data, this post must be one that should be on the GUESS page
  if (dbPost) {
    guessStore.dbPost = dbPost;
    appStore.navigateTo(Page.GUESS);
  }

  appStore.loading = false;
  sendMessage({
    type: "LOADED_EVENT",
  });
};
