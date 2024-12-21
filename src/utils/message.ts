import { Devvit } from "@devvit/public-api";

import { Message } from "@shared/types/message.js";

import { WEBVIEW_ID } from "@/constants/webview.js";

export const sendMessage = <T extends Message = Message>(context: Devvit.Context, message: T) => {
  console.log(`Sending message (${message.type})`, message);
  context.ui.webView.postMessage(WEBVIEW_ID, message);
};
