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

  const guessCount = playedPost.guesses.length;

  let commentText = "";
  if (guessCount === 1) {
    commentText = "I got it correct on my first guess!";
  } else {
    const guessInputList = playedPost.guesses.reduce<string>((acc, { input }, index) => {
      const isFirst = index === 0;
      const isLast = index === playedPost.guesses.length - 1;
      if (isLast) {
        return acc + ` and *"${input}"*`;
      } else {
        return acc + `${isFirst ? "" : ", "}*"${input}"*`;
      }
    }, "");
    commentText = `I got it correct after **${guessCount} guesses!** My guesses were ${guessInputList}.`;
  }

  // Add a comment to the post
  await context.reddit.submitComment({
    id: postId,
    text: commentText,
  });

  sendMessage(context, {
    type: "GUESS_RESPONSE",
  });
};
