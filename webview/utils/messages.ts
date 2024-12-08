import { toRaw } from "vue";

import { Message } from "../../shared/types/message";

export const sendMessage = (message: Message) => {
  console.log(`Sending message (${message.type})`, message);
  window.parent.postMessage(message, "*");
};
