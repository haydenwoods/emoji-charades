import { Devvit } from "@devvit/public-api";

import { sendMessage } from "@/utils/message.js";

import { CreateRequest } from "@shared/types/message.js";
import { PostData } from "@shared/types/post-data.js";
import { MessageHandler } from "@/types/message.js";
import { Loading } from "@/components/Loading.js";

export const onCreateRequest: MessageHandler<CreateRequest> = async ({ message, context }) => {
  const { userId } = context;
  if (!userId) return;

  const { topic, sentence } = message.data;
  // TODO: Validate sentence, etc

  const subreddit = await context.reddit.getCurrentSubreddit();
  const post = await context.reddit.submitPost({
    title: "What is this Emoji Phrase?",
    subredditName: subreddit.name,
    preview: <Loading />,
  });

  await context.redis.hSet(`post:${post.id}`, {
    topicName: topic.name,
    topicCategory: topic.category.toString(),
    sentence,
    createdBy: userId,
  } satisfies PostData);

  sendMessage(context, {
    type: "CREATE_RESPONSE",
  });

  context.ui.showToast({ text: "Created a new Emoji Phrase!" });
  context.ui.navigateTo(post);
};
