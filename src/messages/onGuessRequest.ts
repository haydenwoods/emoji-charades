import { sendMessage } from "@/utils/message.js";
import { getObject, setObject } from "@/utils/db.js";

import { GuessRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";
import { DBUser } from "@shared/types/db/user.js";
import { isGuessSimilar } from "@shared/utils/topics.js";
import { DBPost } from "@shared/types/db/post.js";
import { getPostCompletedCommentText } from "@/utils/comment.js";

export const onGuessRequest: MessageHandler<GuessRequest> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) return;

  const { input } = message.data;

  const now = new Date().toISOString();
  const dbUserKey = `user:${userId}`;
  const dbPostKey = `post:${postId}`;

  const dbPost = await getObject<DBPost>(context.redis, dbPostKey);
  if (!dbPost?.topic) return;

  const correct = isGuessSimilar(input, dbPost.topic);

  // Find or create the DBUser
  let dbUser = await getObject<DBUser>(context.redis, dbUserKey);
  if (!dbUser) {
    dbUser = {
      id: userId,
      playedPosts: [],
      createdAt: now,
    };
  }

  // Find or create the PlayedPost on the DBUser
  let playedPost = dbUser.playedPosts.find(({ id }) => id === postId);
  if (!playedPost) {
    playedPost = {
      id: postId,
      guesses: [],
      createdAt: now,
    };
    dbUser.playedPosts.push(playedPost);
  }

  // Create the guess on the PlayedPost
  playedPost.guesses.push({
    correct,
    input,
    createdAt: now,
  });

  if (correct) {
    // Set the playedPost to completed
    playedPost.completedAt = now;

    // Add XP to the user
    // Add XP to the user that created the post

    // Add a comment to the post
    await context.reddit.submitComment({
      id: postId,
      text: getPostCompletedCommentText(playedPost),
    });
  }

  // Update the DBUser
  await setObject<DBUser>(context.redis, dbUserKey, dbUser);

  sendMessage(context, {
    type: "GUESS_RESPONSE",
    data: {
      correct,
    },
  });
};
