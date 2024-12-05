import { useEventListener } from "@vueuse/core";

import { Message } from "@shared/types/message";

import { onUserDataEvent } from "./onUserDataEvent";

useEventListener(window, "message", async (event) => {
  if (event.data.type === "devvit-message") {
    const message = event.data.data.message as Message;
    console.log(`Received message (${message.type})`, message);

    switch (message.type) {
      case "USER_DATA_EVENT":
        return onUserDataEvent(message);
    }
  }
});
