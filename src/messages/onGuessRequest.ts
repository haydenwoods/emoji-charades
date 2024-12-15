import { sendMessage } from "@/utils/message.js";
import { getObject, setObject } from "@/utils/db/index.js";

import { GuessRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";
import { Player } from "@shared/types/db/player.js";
import { isGuessCorrect } from "@shared/utils/topics.js";
import { Puzzle } from "@shared/types/db/puzzle.js";
import { getPostCompletedCommentText } from "@/utils/comment.js";
import { addUserXP } from "@/utils/user-xp.js";
import {
  CORRECT_GUESS_XP,
  POST_CREATOR_CORRECT_GUESS_XP,
  SINGLE_GUESS_XP,
} from "@/constants/user-xp.js";
import { getPlayerKey, getPuzzleKey } from "@/utils/db/keys.js";
import { addPuzzleGuess } from "@/utils/puzzle-guesses.js";

export const onGuessRequest: MessageHandler<GuessRequest> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) return;

  const { input } = message.data;

  const now = new Date().toISOString();

  const puzzle = await getObject<Puzzle>(context.redis, getPuzzleKey(postId));
  if (!puzzle?.topic) return;

  const correct = isGuessCorrect(input, puzzle.topic);

  // Find or create the Player
  let player = await getObject<Player>(context.redis, getPlayerKey(userId));
  if (!player) {
    const user = await context.reddit.getUserById(userId);
    player = {
      id: userId,
      username: user?.username ?? "",
      playedPuzzles: [],
      createdAt: now,
    };
  }

  // Find or create the PlayedPuzzle on the Player
  let playedPuzzle = player.playedPuzzles.find(({ id }) => id === postId);
  if (!playedPuzzle) {
    playedPuzzle = {
      id: postId,
      guesses: [],
      createdAt: now,
    };
    player.playedPuzzles.push(playedPuzzle);
  }

  // Create the guess on the PlayedPuzzle
  playedPuzzle.guesses.push({
    correct,
    input,
    createdAt: now,
  });

  if (correct) {
    // Set the PlayedPuzzle to completed
    playedPuzzle.completedAt = now;

    // Add XP to the user
    let xpGained = CORRECT_GUESS_XP;
    if (playedPuzzle.guesses.length <= 1) xpGained += SINGLE_GUESS_XP;
    await addUserXP(context.redis, userId, xpGained);

    await Promise.all([
      // Add XP to the user that created the post
      await addUserXP(context.redis, puzzle.createdBy, POST_CREATOR_CORRECT_GUESS_XP),
      // Add a comment to the post
      context.reddit.submitComment({
        id: postId,
        text: getPostCompletedCommentText(playedPuzzle),
      }),
    ]);
  }

  // Update the Player
  await setObject<Player>(context.redis, getPlayerKey(userId), player);

  // Update the puzzles guesses
  await addPuzzleGuess(context.redis, postId, correct ? puzzle.topic.name : input);

  sendMessage(context, {
    type: "GUESS_PUZZLE_RESPONSE",
    data: {
      correct,
    },
  });
};
