import { useGuessStore } from "@/stores/guess";
import { Page, useAppStore } from "@/stores/app";

import { sendMessage } from "@/utils/messages";

import { InitialDataEvent } from "@shared/types/message";

export const onInitialDataEvent = (message: InitialDataEvent) => {
  const { user, postData } = message.data;

  const appStore = useAppStore();
  const guessStore = useGuessStore();

  appStore.user = user;

  // If there is post data, this post must be one that should be on the GUESS page
  if (postData) {
    guessStore.postData = postData;
    appStore.page = Page.GUESS;
  }

  // Let the root app know we are now loaded
  sendMessage({
    type: "LOADED_EVENT",
  });
};
