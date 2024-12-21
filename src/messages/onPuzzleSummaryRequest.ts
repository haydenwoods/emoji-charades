import { MessageHandler } from "./index.js";

import { PuzzleService } from "@/services/puzzle.js";

import { PuzzleSummaryRequest, PuzzleSummaryResponse } from "@shared/types/message.js";

export const onPuzzleSummaryRequest: MessageHandler<
  PuzzleSummaryRequest,
  PuzzleSummaryResponse
> = async ({ context }) => {
  const { postId } = context;
  if (!postId) {
    return {
      type: "PUZZLE_SUMMARY_RESPONSE",
      success: false,
      error: "No postId provided in the context",
    };
  }

  const puzzleService = new PuzzleService(context);
  const puzzleSummary = await puzzleService.getSummary(postId);

  return {
    type: "PUZZLE_SUMMARY_RESPONSE",
    success: true,
    data: {
      puzzleSummary,
    },
  };
};
