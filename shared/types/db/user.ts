import { Timestamped } from "./index.js";

type Guess = {
  input: string;
  correct: boolean;
} & Timestamped;

type PlayedPost = {
  id: string;
  guesses: Guess[];
  xpGained?: number;
  completedAt?: string;
} & Timestamped;

export type DBUser = {
  id: string;
  playedPosts: PlayedPost[];
} & Timestamped;
