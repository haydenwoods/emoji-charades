import { Puzzle } from "./db/puzzle.js";
import { Player } from "./db/player.js";
import { Topic } from "./topic.js";

export type LeaderboardItem = {
  username: string;
  xp: number;
  rank: number;
};

export interface Message {
  type: string;
}

// Events
export interface MountedEvent extends Message {
  type: "MOUNTED_EVENT";
}

export interface LoadedEvent extends Message {
  type: "LOADED_EVENT";
}

export interface InitialDataEvent extends Message {
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
}

// Request and Response
export interface CreateRequest extends Message {
  type: "CREATE_REQUEST";
  data: {
    topic: Topic;
    clue: string[];
  };
}
export interface CreateResponse extends Message {
  type: "CREATE_RESPONSE";
}

export interface GuessRequest extends Message {
  type: "GUESS_PUZZLE_REQUEST";
  data: {
    input: string;
  };
}
export interface GuessResponse extends Message {
  type: "GUESS_PUZZLE_RESPONSE";
  data: {
    correct: boolean;
  };
}

export interface LeaderboardRequest extends Message {
  type: "LEADERBOARD_REQUEST";
}
export interface LeaderboardResponse extends Message {
  type: "LEADERBOARD_RESPONSE";
  data: {
    leaderboard: LeaderboardItem[];
  };
}

export interface PlayRequest extends Message {
  type: "PLAY_REQUEST";
}
export interface PlayResponse extends Message {
  type: "PLAY_RESPONSE";
  data: {
    success: boolean;
    error?: string;
  };
}
