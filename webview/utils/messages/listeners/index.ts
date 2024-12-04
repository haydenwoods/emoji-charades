import { useEventListener } from "@vueuse/core";

import { Message } from "@shared/types/message";

import { onWebViewMountedResponse } from "./onMountedResponse";

useEventListener(window, "message", async (event) => {
  if (event.data.type === "devvit-message") {
    const message = event.data.data.message as Message;
    console.log(`Received message (${message.type})`, message);

    switch (message.type) {
      case "WEBVIEW_MOUNTED_RESPONSE":
        return onWebViewMountedResponse(message);
    }
  }
});
