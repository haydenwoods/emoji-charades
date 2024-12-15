import { RedisClient } from "@devvit/public-api";

import { getPuzzleGuessCountKey, getPuzzleGuessesKey } from "./db/keys.js";

export type PuzzleGuess = {
  guess: string;
  count: number;
  percentage: number;
  rank: number;
};

export const addPuzzleGuess = async (
  redis: RedisClient,
  postId: string,
  guess: string,
): Promise<void> => {
  await Promise.all([
    redis.incrBy(getPuzzleGuessCountKey(postId), 1),
    redis.zIncrBy(getPuzzleGuessesKey(postId), guess, 1),
  ]);
};

export const getPuzzleGuesses = async (
  redis: RedisClient,
  postId: string,
  max: number,
): Promise<PuzzleGuess[]> => {
  const guessCountString = await redis.get(getPuzzleGuessCountKey(postId));
  if (!guessCountString) return [];

  const guessCount = parseInt(guessCountString);
  const guesses = await redis.zRange(getPuzzleGuessesKey(postId), 0, max - 1);

  return guesses.map<PuzzleGuess>(({ member: guess, score: count }, index) => ({
    guess,
    count,
    percentage: count / guessCount,
    rank: index + 1,
  }));
};
