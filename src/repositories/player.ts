import { Repository } from "./index.js";

import { Player } from "@shared/types/db/player.js";

export type SetPlayerData = Omit<Player, "id" | "createdAt">;

export class PlayerRepository extends Repository {
  async get(id: Player["id"]) {
    return await this.getObject<Player>(this.KEYS.player(id));
  }

  async set(id: Player["id"], data: SetPlayerData) {
    return await this.setObject<Player>(this.KEYS.player(id), {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    });
  }
}
