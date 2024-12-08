import { Timestamped, UserCreated } from "./index.js";

export type DBGuess = {
  guess: string;
  correct: boolean;
} & UserCreated &
  Timestamped;
