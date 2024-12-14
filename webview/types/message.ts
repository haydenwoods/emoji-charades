import { Message } from "../../shared/types/message";

export type MessageHandler<T extends Message = Message> = (message: T) => void | Promise<void>;
