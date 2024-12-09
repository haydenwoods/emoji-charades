import { RedisClient } from "@devvit/public-api";

const KEY: string = "user-xp";

const DEFAULT_XP: number = 0;

export const addUserXP = async (
  redis: RedisClient,
  userId: string,
  amount: number,
): Promise<void> => {
  const xp = await redis.zScore(KEY, userId);
  const exists = xp !== undefined;
  if (exists) {
    await redis.zIncrBy(KEY, userId, amount);
  } else {
    await redis.zAdd(KEY, { member: userId, score: amount });
  }
};

export const getUserXP = async (redis: RedisClient, userId: string): Promise<number> => {
  const xp = await redis.zScore(KEY, userId);
  return xp ?? DEFAULT_XP;
};
