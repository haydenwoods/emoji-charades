import { Context } from "@devvit/public-api";

import { SetPuzzleData, PuzzleRepository } from "@/repositories/puzzle.js";

import { Service } from "./index.js";

import { PuzzleGuessesRepository } from "@/repositories/puzzle-guesses.js";

import { createPuzzlePost } from "@/utils/posts/puzzle.js";

import { PuzzleSummary, PuzzleSummaryGuess } from "@shared/types/puzzle-summary.js";
import { Puzzle } from "@shared/types/db/puzzle.js";

export class PuzzleService extends Service {
  puzzleRepository: PuzzleRepository;
  puzzleGuessesRepository: PuzzleGuessesRepository;

  constructor(context: Context) {
    super(context);

    this.puzzleRepository = new PuzzleRepository(context.redis);
    this.puzzleGuessesRepository = new PuzzleGuessesRepository(context.redis);
  }

  async get(id: Puzzle["id"]) {
    return this.puzzleRepository.get(id);
  }

  async create(subredditName: string, puzzleData: SetPuzzleData) {
    const post = await createPuzzlePost(this.reddit, subredditName);
    const puzzle = await this.puzzleRepository.set(post.id, puzzleData);

    return {
      post,
      puzzle,
    };
  }

  async getSummary(id: Puzzle["id"]): Promise<PuzzleSummary> {
    const [guessCount, guessesRange] = await Promise.all([
      this.puzzleGuessesRepository.getCount(id),
      this.puzzleGuessesRepository.getRange(id, 0, 4),
    ]);

    const mostCommonGuesses = guessesRange.map<PuzzleSummaryGuess>(
      ({ member: guess, score: count }, index) => ({
        guess,
        count,
        percentage: (count / guessCount) * 100,
        rank: index + 1,
      }),
    );

    return {
      guessCount,
      mostCommonGuesses,
    };
  }
}
