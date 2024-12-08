import { InitialDataEvent, MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";

import { MessageHandler } from "@/types/message.js";
import { DBPost } from "@shared/types/db/post.js";
import { getObject } from "@/utils/db.js";
import { DBUser } from "@shared/types/db/user.js";

export const onMountedEvent: MessageHandler<MountedEvent> = async ({ context }) => {
  const { postId, userId } = context;

  let data: InitialDataEvent["data"] = {};

  const getUser = async () => {
    if (!userId) return;
    data.user = await context.reddit.getUserById(userId);
  };

  const getDBPost = async () => {
    if (!postId) return;
    data.dbPost = await getObject<DBPost>(context.redis, `post:${postId}`);
  };

  const getDBUser = async () => {
    if (!userId) return;
    data.dbUser = await getObject<DBUser>(context.redis, `user:${userId}`);
  };

  await Promise.all([getUser(), getDBPost(), getDBUser()]);

  sendMessage(context, {
    type: "INITIAL_DATA_EVENT",
    data,
  });
};
