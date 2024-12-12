import { Timestamped } from "./index.js";

type Guess = {
  input: string;
  correct: boolean;
} & Timestamped;

type CompletedPuzzle = {
  id: string;
  guesses: Guess[];
  xpGained?: number;
  completedAt?: string;
} & Timestamped;

export type Player = {
  id: string;
  username: string;
  completedPuzzles: CompletedPuzzle[];
} & Timestamped;
