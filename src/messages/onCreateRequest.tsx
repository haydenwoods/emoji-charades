import { Devvit } from "@devvit/public-api";

import { sendMessage } from "@/utils/message.js";

import { CreateRequest } from "@shared/types/message.js";
import { Puzzle } from "@shared/types/db/puzzle.js";
import { MessageHandler } from "@/types/message.js";
import { Loading } from "@/components/Loading.js";
import { setObject } from "@/utils/db/index.js";
import { getPuzzleKey } from "@/utils/db/keys.js";

export const onCreateRequest: MessageHandler<CreateRequest> = async ({ message, context }) => {
  const { userId } = context;
  if (!userId) return;

  const { topic, clue } = message.data;
  // TODO: Validate sentence, etc

  const subreddit = await context.reddit.getCurrentSubreddit();
  const post = await context.reddit.submitPost({
    title: "What do these emojis represent?",
    subredditName: subreddit.name,
    preview: <Loading id="preview" />,
  });

  await setObject<Puzzle>(context.redis, getPuzzleKey(post.id), {
    id: post.id,
    topic,
    clue,
    createdBy: userId,
    createdAt: new Date().toISOString(),
  });

  sendMessage(context, {
    type: "CREATE_RESPONSE",
  });

  context.ui.navigateTo(post);
};
