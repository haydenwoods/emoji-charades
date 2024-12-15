import { RedisClient } from "@devvit/public-api";

export const KEY: string = "user-xp";

const DEFAULT_XP: number = 0;

export const addUserXP = async (
  redis: RedisClient,
  userId: string,
  amount: number,
): Promise<void> => {
  await redis.zIncrBy(KEY, userId, amount);
};

export const getUserXP = async (redis: RedisClient, userId: string): Promise<number> => {
  const xp = await redis.zScore(KEY, userId);
  return xp ?? DEFAULT_XP;
};

export const getUserRank = async (
  redis: RedisClient,
  userId: string,
): Promise<number | undefined> => {
  const rank = await redis.zRank(KEY, userId);
  return rank;
};
