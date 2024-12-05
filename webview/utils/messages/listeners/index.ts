import { useEventListener } from "@vueuse/core";

import { Message } from "@shared/types/message";

import { onInitialDataEvent } from "./onInitialDataEvent";

useEventListener(window, "message", async (event) => {
  if (event.data.type === "devvit-message") {
    const message = event.data.data.message as Message;
    console.log(`Received message (${message.type})`, message);

    switch (message.type) {
      case "INITIAL_DATA_EVENT":
        return onInitialDataEvent(message);
    }
  }
});
