import { useEventListener } from "@vueuse/core";

import { Message } from "@shared/types/message";
import { MessageHandler } from "@/types/message";

export const useMessageListener = <T extends Message = Message>(
  type: Message["type"],
  callback: MessageHandler<T>,
) => {
  useEventListener(window, "message", async (event) => {
    if (event.data.type !== "devvit-message") return;

    const message = event.data.data.message as Message;
    if (message.type !== type) return;

    console.log(`Received message (${message.type})`, message);
    callback(message as T);
  });
};
