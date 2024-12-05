import { CreateRequest } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";

import { MessageHandler } from "@/types/message.js";

export const onCreateRequest: MessageHandler<CreateRequest> = async (message, context) => {
  console.log(message.data);
};
