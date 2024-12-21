import { MessageHandler } from "./index.js";

import { PuzzleService } from "@/services/puzzle.js";
import { PlayerService } from "@/services/player.js";

import { PuzzleGuessRequest, PuzzleGuessResponse } from "@shared/types/message.js";

export const onPuzzleGuessRequest: MessageHandler<
  PuzzleGuessRequest,
  PuzzleGuessResponse
> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) {
    return {
      type: "PUZZLE_GUESS_RESPONSE",
      success: false,
      error: "No userId or postId was present in the context",
    };
  }

  const user = await context.reddit.getUserById(userId);
  if (!user) {
    return {
      type: "PUZZLE_GUESS_RESPONSE",
      success: false,
      error: `No user was found by the ID:${userId}`,
    };
  }

  const { input } = message.data;
  const inputTrimmed = input.trim();

  const puzzleService = new PuzzleService(context);
  const playerService = new PlayerService(context);

  const puzzle = await puzzleService.get(postId);
  if (!puzzle) {
    return {
      type: "PUZZLE_GUESS_RESPONSE",
      success: false,
      error: `No puzzle was found by the ID:${postId}`,
    };
  }

  const { correct } = await playerService.addGuess(userId, user, puzzle, inputTrimmed);

  return {
    type: "PUZZLE_GUESS_RESPONSE",
    success: true,
    data: {
      correct,
    },
  };
};
