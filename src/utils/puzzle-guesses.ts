import { RedisClient } from "@devvit/public-api";

import { getPuzzleGuessCountKey, getPuzzleGuessesKey } from "./db/keys.js";

import { PuzzleGuess } from "@shared/types/puzzle-guess.js";

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

export const getPuzzleGuessRange = async (
  redis: RedisClient,
  postId: string,
  min: number = 0,
  max: number = 4,
): Promise<PuzzleGuess[]> => {
  const guessCountString = await redis.get(getPuzzleGuessCountKey(postId));
  if (!guessCountString) return [];

  const guessCount = parseInt(guessCountString);
  const guesses = await redis.zRange(getPuzzleGuessesKey(postId), min, max - 1, {
    reverse: true,
    by: "rank",
  });

  return guesses.map<PuzzleGuess>(({ member: guess, score: count }, index) => ({
    guess,
    count,
    percentage: (count / guessCount) * 100,
    rank: index + 1,
  }));
};
