import { Devvit } from "@devvit/public-api";
import { Message } from "@shared/types/message.js";

export type MessageHandler<T extends Message = Message, R = void> = (
  message: T,
  context: Devvit.Context,
) => R | Promise<R>;
