import { RedisClient } from "@devvit/public-api";

import { getPuzzleGuessRange } from "./puzzle-guesses.js";

import { PuzzleSummary } from "@shared/types/puzzle-summary.js";

export const getPuzzleSummary = async (
  redis: RedisClient,
  postId: string,
): Promise<PuzzleSummary> => {
  const mostCommonGuesses = await getPuzzleGuessRange(redis, postId, 0, 5);

  return {
    mostCommonGuesses,
  };
};
