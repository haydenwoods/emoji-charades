import { Repository } from "./index.js";

import { Puzzle } from "@shared/types/db/puzzle.js";
import { Guess } from "@shared/types/db/player.js";

export class PuzzleGuessesRepository extends Repository {
  async getCount(id: Puzzle["id"]): Promise<number> {
    const countString = await this.redis.get(this.KEYS.puzzleGuessesCount(id));
    if (!countString) return -1;
    const count = parseInt(countString);
    return count;
  }

  async getRange(id: Puzzle["id"], minIndex: number, maxIndex: number) {
    return await this.redis.zRange(this.KEYS.puzzleGuesses(id), minIndex, maxIndex, {
      reverse: true,
      by: "rank",
    });
  }

  async add(id: Puzzle["id"], input: Guess["input"]) {
    await Promise.all([
      await this.redis.incrBy(this.KEYS.puzzleGuessesCount(id), 1),
      await this.redis.zIncrBy(this.KEYS.puzzleGuesses(id), input.trim(), 1),
    ]);
  }
}
