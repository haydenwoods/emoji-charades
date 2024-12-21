import { Context, Devvit } from "@devvit/public-api";

import { Message } from "@shared/types/message.js";

import { WEBVIEW_ID } from "@/constants/webview.js";

export const sendMessage = <T extends Message = Message>(ui: Context["ui"], message: T) => {
  ui.webView.postMessage(WEBVIEW_ID, message);
};
