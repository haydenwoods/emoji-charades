import { Context, User } from "@devvit/public-api";

import { Service } from "./index.js";

import { isGuessCorrect } from "@shared/utils/topics.js";

import { PlayerRepository, SetPlayerData } from "@/repositories/player.js";
import { PlayerXPRepository } from "@/repositories/player-xp.js";

import { Guess, Player } from "@shared/types/db/player.js";
import { Puzzle } from "@shared/types/db/puzzle.js";

import {
  CORRECT_GUESS_XP,
  PUZZLE_CREATOR_CORRECT_GUESS_XP,
  SINGLE_GUESS_XP,
} from "@/constants/player-xp.js";
import { getPostCompletedCommentText } from "@/utils/comment.js";
import { PuzzleGuessesRepository } from "@/repositories/puzzle-guesses.js";

export class PlayerService extends Service {
  playerRepository: PlayerRepository;
  playerXPRepository: PlayerXPRepository;
  puzzleGuessesRepository: PuzzleGuessesRepository;

  constructor(context: Context) {
    super(context);

    this.playerRepository = new PlayerRepository(context.redis);
    this.playerXPRepository = new PlayerXPRepository(context.redis);
    this.puzzleGuessesRepository = new PuzzleGuessesRepository(context.redis);
  }

  async get(id: Player["id"]) {
    return this.playerRepository.get(id);
  }

  async create(id: Player["id"], data: SetPlayerData) {
    return this.playerRepository.set(id, data);
  }

  async getOrCreate(id: Player["id"], data: SetPlayerData) {
    let player = await this.get(id);
    if (player) return player;
    player = await this.create(id, data);
    return player;
  }

  async getXP(id: Player["id"]) {
    return await this.playerXPRepository.getXP(id);
  }

  async getRank(id: Player["id"]) {
    return await this.playerXPRepository.getRank(id);
  }

  async addGuess(id: Player["id"], user: User, puzzle: Puzzle, input: Guess["input"]) {
    input = input.trim();

    const now = new Date().toISOString();

    // Get the player, create if there isn't an existing one
    const player = await this.getOrCreate(id, {
      username: user.username,
      playedPuzzles: [],
    });

    // Check if the guess is correct or not
    const correct = isGuessCorrect(input, puzzle.topic);

    // Create the Guess
    const guess: Guess = {
      input,
      correct,
      createdAt: now,
    };

    // Find the existing PlayedPuzzle
    let playedPuzzle = player.playedPuzzles.find(({ id }) => id === puzzle.id);

    // Update or create the PlayedPuzzle with the new guess
    if (playedPuzzle) {
      playedPuzzle.guesses.push(guess);
      playedPuzzle.completedAt = now;
    } else {
      playedPuzzle = {
        id: puzzle.id,
        guesses: [guess],
        createdAt: now,
        completedAt: correct ? now : undefined,
      };
      player.playedPuzzles.push(playedPuzzle);
    }

    const promises: Promise<unknown>[] = [
      this.playerRepository.set(id, player),
      this.puzzleGuessesRepository.add(puzzle.id, input),
    ];

    if (correct) {
      promises.push(
        this.reddit.submitComment({
          id: puzzle.id,
          text: getPostCompletedCommentText(playedPuzzle),
        }),
      );

      // Add XP to the guesser
      let xpGained = CORRECT_GUESS_XP;
      const guessesCount = playedPuzzle.guesses.length;
      if (guessesCount <= 1) xpGained += SINGLE_GUESS_XP;
      promises.push(this.playerXPRepository.add(id, xpGained));

      // Add XP to the creator
      promises.push(this.playerXPRepository.add(puzzle.createdBy, PUZZLE_CREATOR_CORRECT_GUESS_XP));
    }

    await Promise.all(promises);

    return {
      updatedPlayer: player,
      correct,
    };
  }
}
