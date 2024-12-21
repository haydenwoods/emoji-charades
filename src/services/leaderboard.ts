import { Context } from "@devvit/public-api";

import { Service } from "./index.js";

import { PlayerXPRepository } from "@/repositories/player-xp.js";
import { PlayerRepository } from "@/repositories/player.js";

import { LeaderboardItem } from "@shared/types/leaderboard.js";

export class LeaderboardService extends Service {
  playerRepository: PlayerRepository;
  playerXPRepository: PlayerXPRepository;

  constructor(context: Context) {
    super(context);

    this.playerRepository = new PlayerRepository(context.redis);
    this.playerXPRepository = new PlayerXPRepository(context.redis);
  }

  async getTop(limit: number): Promise<LeaderboardItem[]> {
    const playerXPRange = await this.playerXPRepository.getRange(0, limit - 1);

    // Get the all the players from the range members
    const players = await Promise.all(
      playerXPRange.map(async ({ member: playerId }) => {
        return await this.playerRepository.get(playerId);
      }),
    );

    // Construct the leaderboard
    const leaderboard = playerXPRange.map<LeaderboardItem>(({ score: xp }, index) => ({
      username: players[index]?.username ?? "Unknown Player",
      xp,
      rank: index + 1,
    }));

    return leaderboard;
  }
}
