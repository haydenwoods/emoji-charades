import { RedisClient } from "@devvit/public-api";

export const setObject = async <T extends Record<string, unknown>>(
  redis: RedisClient,
  key: string,
  data: T,
): Promise<string> => {
  const value = JSON.stringify(data);
  return await redis.set(key, value);
};

export const getObject = async <T extends Record<string, unknown>>(
  redis: RedisClient,
  key: string,
): Promise<T | undefined> => {
  const value = await redis.get(key);
  if (!value) return;
  const data = JSON.parse(value);
  return data as T;
};
