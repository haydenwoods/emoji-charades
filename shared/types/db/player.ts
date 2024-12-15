import { Timestamped } from "./index.js";

type Guess = {
  input: string;
  correct: boolean;
} & Timestamped;

type PlayedPuzzle = {
  id: string;
  guesses: Guess[];
  xpGained?: number;
  completedAt?: string;
} & Timestamped;

export type Player = {
  id: string;
  username: string;
  playedPuzzles: PlayedPuzzle[];
} & Timestamped;
