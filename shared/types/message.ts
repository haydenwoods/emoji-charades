import { User } from "./user.js";
import { Puzzle } from "./db/puzzle.js";
import { Player } from "./db/player.js";
import { Topic } from "./topic.js";
import { PuzzleSummary } from "./puzzle-summary.js";
import { LeaderboardItem } from "./leaderboard.js";

type Request<T extends string, D = undefined> = {
  type: T;
  data: D;
};
type Response<T extends string, D = undefined> = {
  type: T;
  success: boolean;
  data?: D;
  error?: string;
};

export type WebviewMountedRequest = Request<"WEBVIEW_MOUNTED_REQUEST">;
export type WebviewMountedResponse = Response<
  "WEBVIEW_MOUNTED_RESPONSE",
  {
    user: User;
    player: Player;
    playerXP?: number;
    playerRank?: number;
    puzzle?: Puzzle;
    puzzleSummary?: PuzzleSummary;
  }
>;

export type PuzzleCreateRequest = Request<
  "PUZZLE_CREATE_REQUEST",
  { topic: Topic; clue: string[] }
>;
export type PuzzleCreateResponse = Response<"PUZZLE_CREATE_RESPONSE">;

export type PuzzleGuessRequest = Request<"PUZZLE_GUESS_REQUEST", { input: string }>;
export type PuzzleGuessResponse = Response<"PUZZLE_GUESS_RESPONSE", { correct: boolean }>;

export type PuzzleSummaryRequest = Request<"PUZZLE_SUMMARY_REQUEST">;
export type PuzzleSummaryResponse = Response<
  "PUZZLE_SUMMARY_RESPONSE",
  { puzzleSummary: PuzzleSummary }
>;

export type LeaderboardRequest = Request<"LEADERBOARD_REQUEST">;
export type LeaderboardResponse = Response<
  "LEADERBOARD_RESPONSE",
  { leaderboard: LeaderboardItem[] }
>;

export type PlayRequest = Request<"PLAY_REQUEST">;
export type PlayResponse = Response<"PLAY_RESPONSE">;

export type Message =
  | WebviewMountedRequest
  | WebviewMountedResponse
  | PuzzleCreateRequest
  | PuzzleCreateResponse
  | PuzzleGuessRequest
  | PuzzleGuessResponse
  | LeaderboardRequest
  | LeaderboardResponse
  | PlayRequest
  | PlayResponse
  | PuzzleSummaryRequest
  | PuzzleSummaryResponse;
