import { JSONValue, RedisClient } from "@devvit/public-api";

export class Repository {
  readonly redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  KEYS = {
    topics: "topics",
    topicCategories: "topic-categories",
    player: (playerId: string) => `player:${playerId}`,
    playerXP: "player-xp",
    puzzle: (puzzleId: string) => `puzzle:${puzzleId}`,
    puzzleGuesses: (puzzleId: string) => `puzzle-guesses:${puzzleId}`,
    puzzleGuessesCount: (puzzleId: string) => `puzzle-guesses-count:${puzzleId}`,
  };

  async getObject<T extends JSONValue>(key: string): Promise<T | undefined> {
    const value = await this.redis.get(key);
    if (!value) return;
    const object = JSON.parse(value) as T;
    return object;
  }

  async setObject<T extends JSONValue>(key: string, object: T): Promise<T> {
    const value = JSON.stringify(object);
    const response = await this.redis.set(key, value);
    if (response === "OK") {
      return object;
    } else {
      throw Error("Error: setObject failed");
    }
  }
}
