import { Devvit, StateSetter } from "@devvit/public-api";

import { Message } from "@shared/types/message.js";

export type MessageHandler<T extends Message = Message, R = void> = (args: {
  message: T;
  context: Devvit.Context;
  app: {
    loading: boolean;
    setLoading: StateSetter<boolean>;
    showWebview: boolean;
    setShowWebview: StateSetter<boolean>;
  };
}) => R | Promise<R>;
