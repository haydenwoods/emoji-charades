import { Repository } from "./index.js";

import { Player } from "@shared/types/db/player.js";

export class PlayerXPRepository extends Repository {
  async add(id: Player["id"], amount: number) {
    const score = await this.redis.zScore(this.KEYS.playerXP, id);

    if (score === undefined) {
      await this.redis.zAdd(this.KEYS.playerXP, {
        member: id,
        score: amount,
      });
    } else {
      await this.redis.zIncrBy(this.KEYS.playerXP, id, amount);
    }
  }

  async getXP(id: Player["id"]) {
    return this.redis.zScore(this.KEYS.playerXP, id);
  }

  async getRank(id: Player["id"]) {
    const rank = await this.redis.zRank(this.KEYS.playerXP, id);
    return rank === undefined ? -1 : rank + 1;
  }

  async getRange(minIndex: number, maxIndex: number) {
    return await this.redis.zRange(this.KEYS.playerXP, minIndex, maxIndex, {
      reverse: true,
      by: "rank",
    });
  }
}
