import { sendMessage } from "@/utils/message.js";
import { getObject, setObject } from "@/utils/db.js";

import { GuessRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";
import { DBUser } from "@shared/types/db/user.js";

export const onGuessRequest: MessageHandler<GuessRequest> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) return;

  const { input } = message.data;

  const now = new Date();
  const dbUserKey = `user:${userId}`;

  // Find or create the DBUser
  let dbUser = await getObject<DBUser>(context.redis, dbUserKey);
  console.log("Updating DBUser. Before:", dbUser);
  if (!dbUser) {
    dbUser = {
      id: userId,
      playedPosts: [],
      createdAt: now.toISOString(),
    };
  }

  // Find or create the PlayedPost on the DBUser
  let playedPost = dbUser.playedPosts.find(({ id }) => id === postId);
  if (!playedPost) {
    playedPost = {
      id: postId,
      guesses: [],
      createdAt: now.toISOString(),
    };
    dbUser.playedPosts.push(playedPost);
  }

  // Create the guess on the PlayedPost
  playedPost.guesses.push({
    correct: true,
    input,
    createdAt: now.toISOString(),
  });

  // Update the DBUser
  await setObject<DBUser>(context.redis, dbUserKey, dbUser);
  console.log("Updated DBUser. After:", dbUser);

  // Add a comment to the post
  await context.reddit.submitComment({
    id: postId,
    text: "I got it correct! I took 2 guesses and used 0 hints.",
  });

  sendMessage(context, {
    type: "GUESS_RESPONSE",
    data: {
      correct: true,
    },
  });
};
