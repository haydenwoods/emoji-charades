import { InitialDataEvent, MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";
import { getUserRank, getUserXP } from "@/utils/user-xp.js";
import { getObject } from "@/utils/db.js";

import { MessageHandler } from "@/types/message.js";
import { DBPost } from "@shared/types/db/post.js";
import { DBUser } from "@shared/types/db/user.js";

export const onMountedEvent: MessageHandler<MountedEvent> = async ({ context, app }) => {
  app.setWebviewMounted(true);

  const { postId, userId } = context;
  if (!userId) return;

  const user = await context.reddit.getUserById(userId);
  if (!user) return;

  let data: InitialDataEvent["data"] = {
    user,
  };

  const _getUserXP = async () => {
    data.userXP = await getUserXP(context.redis, user.username);
  };

  const _getUserRank = async () => {
    data.userRank = await getUserRank(context.redis, user.username);
  };

  const getDBUser = async () => {
    data.dbUser = await getObject<DBUser>(context.redis, `user:${userId}`);
  };

  const getDBPost = async () => {
    if (!postId) return;
    data.dbPost = await getObject<DBPost>(context.redis, `post:${postId}`);
  };

  await Promise.all([_getUserXP(), _getUserRank(), getDBUser(), getDBPost()]);

  sendMessage(context, {
    type: "INITIAL_DATA_EVENT",
    data,
  });
};
