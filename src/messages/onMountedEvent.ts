import { MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";

import { MessageHandler } from "@/types/message.js";

export const onMountedEvent: MessageHandler<MountedEvent> = async (message, context) => {
  // Send user data event if there is a valid user in the context
  if (context.userId) {
    const user = await context.reddit.getUserById(context.userId);
    if (user) {
      sendMessage(context, {
        type: "USER_DATA_EVENT",
        data: {
          user: {
            id: user.id,
            username: user.username,
          },
        },
      });
    }
  }
};
