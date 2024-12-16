import { Devvit } from "@devvit/public-api";

import { PUZZLE_FLAIR_ID } from "@/constants/flairs.js";

import { sendMessage } from "@/utils/message.js";
import { setObject } from "@/utils/db/index.js";
import { getPuzzleKey } from "@/utils/db/keys.js";

import { CreateRequest } from "@shared/types/message.js";
import { Puzzle } from "@shared/types/db/puzzle.js";
import { MessageHandler } from "@/types/message.js";

import { Loading } from "@/components/Loading.js";

export const onCreateRequest: MessageHandler<CreateRequest> = async ({ message, context }) => {
  const { userId, subredditName } = context;
  if (!userId || !subredditName) return;

  const user = await context.reddit.getUserById(userId);
  if (!user) return;

  const { topic, clue } = message.data;

  const post = await context.reddit.submitPost({
    title: "What do these emojis represent?",
    subredditName,
    preview: <Loading id="preview" />,
    flairId: PUZZLE_FLAIR_ID,
  });

  await setObject<Puzzle>(context.redis, getPuzzleKey(post.id), {
    id: post.id,
    topic,
    clue,
    createdBy: user.id,
    createdByUsername: user.username,
    createdAt: new Date().toISOString(),
  });

  sendMessage(context, {
    type: "CREATE_RESPONSE",
  });

  context.ui.navigateTo(post);
};
