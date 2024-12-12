import { sendMessage } from "@/utils/message.js";
import { getObject, setObject } from "@/utils/db/index.js";

import { GuessRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";
import { Player } from "@shared/types/db/player.js";
import { isGuessSimilar } from "@shared/utils/topics.js";
import { Puzzle } from "@shared/types/db/puzzle.js";
import { getPostCompletedCommentText } from "@/utils/comment.js";
import { addUserXP } from "@/utils/user-xp.js";
import {
  CORRECT_GUESS_XP,
  POST_CREATOR_CORRECT_GUESS_XP,
  SINGLE_GUESS_XP,
} from "@/constants/user-xp.js";
import { getPlayerKey, getPuzzleKey } from "@/utils/db/keys.js";

export const onGuessRequest: MessageHandler<GuessRequest> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) return;

  const { input } = message.data;

  const now = new Date().toISOString();

  const puzzle = await getObject<Puzzle>(context.redis, getPuzzleKey(postId));
  if (!puzzle?.topic) return;

  const correct = isGuessSimilar(input, puzzle.topic);

  // Find or create the Player
  let player = await getObject<Player>(context.redis, getPlayerKey(userId));
  if (!player) {
    const user = await context.reddit.getUserById(userId);
    player = {
      id: userId,
      username: user?.username ?? "",
      completedPuzzles: [],
      createdAt: now,
    };
  }

  // Find or create the CompletedPuzzle on the Player
  let playedPost = player.completedPuzzles.find(({ id }) => id === postId);
  if (!playedPost) {
    playedPost = {
      id: postId,
      guesses: [],
      createdAt: now,
    };
    player.completedPuzzles.push(playedPost);
  }

  // Create the guess on the CompletedPuzzle
  playedPost.guesses.push({
    correct,
    input,
    createdAt: now,
  });

  if (correct) {
    // Set the playedPost to completed
    playedPost.completedAt = now;

    // Add XP to the user
    let xpGained = CORRECT_GUESS_XP;
    if (playedPost.guesses.length <= 1) xpGained += SINGLE_GUESS_XP;
    await addUserXP(context.redis, userId, xpGained);

    await Promise.all([
      // Add XP to the user that created the post
      await addUserXP(context.redis, puzzle.createdBy, POST_CREATOR_CORRECT_GUESS_XP),
      // Add a comment to the post
      context.reddit.submitComment({
        id: postId,
        text: getPostCompletedCommentText(playedPost),
      }),
    ]);
  }

  // Update the Player
  await setObject<Player>(context.redis, getPlayerKey(userId), player);

  sendMessage(context, {
    type: "GUESS_PUZZLE_RESPONSE",
    data: {
      correct,
    },
  });
};
