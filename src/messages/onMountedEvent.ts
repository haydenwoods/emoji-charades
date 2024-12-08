import { InitialDataEvent, MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";

import { MessageHandler } from "@/types/message.js";
import { DBPost } from "@shared/types/db/post.js";
import { getObject } from "@/utils/db.js";

export const onMountedEvent: MessageHandler<MountedEvent> = async ({ context, app }) => {
  const { postId, userId } = context;

  let data: InitialDataEvent["data"] = {};

  // Send user data event if there is a valid user in the context
  if (userId) {
    const user = await context.reddit.getUserById(userId);
    if (user) {
      data.user = {
        id: user.id,
        username: user.username,
      };
    }
  }

  // Send the post data if there is valid post in the context
  if (postId) {
    const postData = await getObject<DBPost>(context.redis, `post:${postId}`);
    if (postData) {
      data.postData = postData;
      app.setShowWebview(true);
    }
  }

  sendMessage(context, {
    type: "INITIAL_DATA_EVENT",
    data,
  });
};
