import { Repository } from "./index.js";

import { Puzzle } from "@shared/types/db/puzzle.js";

export type SetPuzzleData = Omit<Puzzle, "id" | "createdAt">;

export class PuzzleRepository extends Repository {
  async get(id: Puzzle["id"]) {
    return this.getObject<Puzzle>(this.KEYS.puzzle(id));
  }

  async set(id: Puzzle["id"], data: SetPuzzleData) {
    return this.setObject<Puzzle>(this.KEYS.puzzle(id), {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    });
  }
}
