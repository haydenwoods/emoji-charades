import { Devvit, StateSetter } from "@devvit/public-api";

import { Message } from "@shared/types/message.js";

import { onWebviewMountedRequest } from "./onWebviewMountedRequest.js";
import { onPuzzleCreateRequest } from "./onPuzzleCreateRequest.js";
import { onPuzzleGuessRequest } from "./onPuzzleGuessRequest.js";
import { onLeaderboardRequest } from "./onLeaderboardRequest.js";
import { onPlayRequest } from "./onPlayRequest.js";
import { onPuzzleSummaryRequest } from "./onPuzzleSummaryRequest.js";

export type MessageHandler<T extends Message = Message, R = Message | void> = (args: {
  message: T;
  context: Devvit.Context;
  app: {
    webviewMounted: boolean;
    setWebviewMounted: StateSetter<boolean>;
  };
}) => R | Promise<R>;

export const MESSAGE_TYPE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  WEBVIEW_MOUNTED_REQUEST: onWebviewMountedRequest,
  PUZZLE_CREATE_REQUEST: onPuzzleCreateRequest,
  PUZZLE_GUESS_REQUEST: onPuzzleGuessRequest,
  LEADERBOARD_REQUEST: onLeaderboardRequest,
  PLAY_REQUEST: onPlayRequest,
  PUZZLE_SUMMARY_REQUEST: onPuzzleSummaryRequest,
};
