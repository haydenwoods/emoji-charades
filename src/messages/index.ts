import { Devvit, StateSetter } from "@devvit/public-api";

import { Message } from "@shared/types/message.js";

export type MessageHandler<T extends Message = Message, R = Message | void> = (args: {
  message: T;
  context: Devvit.Context;
  app: {
    webviewMounted: boolean;
    setWebviewMounted: StateSetter<boolean>;
  };
}) => R | Promise<R>;
