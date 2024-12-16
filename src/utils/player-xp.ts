import { RedisClient } from "@devvit/public-api";

export const PLAYER_XP_SORTED_SET_KEY: string = "player-xp";

const DEFAULT_XP: number = 0;

export const addPlayerXP = async (
  redis: RedisClient,
  id: string,
  amount: number,
): Promise<void> => {
  const score = await redis.zScore(PLAYER_XP_SORTED_SET_KEY, id);
  if (score === undefined) {
    await redis.zAdd(PLAYER_XP_SORTED_SET_KEY, {
      member: id,
      score: amount,
    });
  } else {
    await redis.zIncrBy(PLAYER_XP_SORTED_SET_KEY, id, amount);
  }
};

export const getPlayerXP = async (redis: RedisClient, id: string): Promise<number> => {
  const xp = await redis.zScore(PLAYER_XP_SORTED_SET_KEY, id);
  return xp ?? DEFAULT_XP;
};

export const getPlayerRank = async (
  redis: RedisClient,
  id: string,
): Promise<number | undefined> => {
  const rank = await redis.zRank(PLAYER_XP_SORTED_SET_KEY, id);
  if (rank === undefined) return;
  return rank + 1;
};
