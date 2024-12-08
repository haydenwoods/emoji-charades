import { Devvit } from "@devvit/public-api";

import { sendMessage } from "@/utils/message.js";

import { CreateRequest } from "@shared/types/message.js";
import { DBPost } from "@shared/types/db/post.js";
import { MessageHandler } from "@/types/message.js";
import { Loading } from "@/components/Loading.js";
import { setObject } from "@/utils/db.js";

export const onCreateRequest: MessageHandler<CreateRequest> = async ({ message, context }) => {
  const { userId } = context;
  if (!userId) return;

  const { topic, clue } = message.data;
  // TODO: Validate sentence, etc

  const subreddit = await context.reddit.getCurrentSubreddit();
  const post = await context.reddit.submitPost({
    title: "What do these emojis represent?",
    subredditName: subreddit.name,
    preview: <Loading />,
  });

  await setObject<DBPost>(context.redis, `post:${post.id}`, {
    id: post.id,
    topic,
    clue,
    createdBy: userId,
    createdAt: new Date().toISOString(),
  });

  sendMessage(context, {
    type: "CREATE_RESPONSE",
  });

  context.ui.showToast({ text: "Created a new Emoji Game post!" });
  context.ui.navigateTo(post);
};
