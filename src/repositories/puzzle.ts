import { Repository } from "./index.js";

import { Puzzle } from "@shared/types/db/puzzle.js";

export type CreatePuzzleData = Omit<Puzzle, "id" | "createdAt">;

export class PuzzleRepository extends Repository {
  async get(id: Puzzle["id"]) {
    return await this.getObject<Puzzle>(this.KEYS.puzzle(id));
  }

  async create(id: Puzzle["id"], data: CreatePuzzleData) {
    return await this.setObject<Puzzle>(this.KEYS.puzzle(id), {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    });
  }
}
