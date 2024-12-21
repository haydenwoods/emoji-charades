export type PuzzleSummaryGuess = {
  guess: string;
  count: number;
  percentage: number;
  rank: number;
};

export type PuzzleSummary = {
  guessCount: number;
  mostCommonGuesses: PuzzleSummaryGuess[];
};
