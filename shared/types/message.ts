import { Puzzle } from "./db/puzzle.js";
import { Player } from "./db/player.js";
import { Topic } from "./topic.js";

export type LeaderboardItem = {
  username: string;
  xp: number;
  rank: number;
};

// Events
export type MountedEvent = {
  type: "MOUNTED_EVENT";
};

export type LoadedEvent = {
  type: "LOADED_EVENT";
};

export type InitialDataEvent = {
  type: "INITIAL_DATA_EVENT";
  data: {
    user?: {
      id: string;
      username: string;
    };
    player?: Player;
    playerXP?: number;
    playerRank?: number;
    puzzle?: Puzzle;
  };
};

// Request and Response
export type CreateRequest = {
  type: "CREATE_REQUEST";
  data: {
    topic: Topic;
    clue: string[];
  };
};
export type CreateResponse = {
  type: "CREATE_RESPONSE";
};

export type GuessRequest = {
  type: "GUESS_PUZZLE_REQUEST";
  data: {
    input: string;
  };
};
export type GuessResponse = {
  type: "GUESS_PUZZLE_RESPONSE";
  data: {
    correct: boolean;
  };
};

export type LeaderboardRequest = {
  type: "LEADERBOARD_REQUEST";
};
export type LeaderboardResponse = {
  type: "LEADERBOARD_RESPONSE";
  data: {
    leaderboard: LeaderboardItem[];
  };
};

export type PlayRequest = {
  type: "PLAY_REQUEST";
};
export type PlayResponse = {
  type: "PLAY_RESPONSE";
  data: {
    success: boolean;
    error?: string;
  };
};

export type Message =
  | MountedEvent
  | LoadedEvent
  | InitialDataEvent
  | CreateRequest
  | CreateResponse
  | GuessRequest
  | GuessResponse
  | LeaderboardRequest
  | LeaderboardResponse
  | PlayRequest
  | PlayResponse;
