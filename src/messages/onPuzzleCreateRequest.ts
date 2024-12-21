import { MessageHandler } from "./index.js";

import { PuzzleService } from "@/services/puzzle.js";

import { PuzzleCreateRequest, PuzzleCreateResponse } from "@shared/types/message.js";

export const onPuzzleCreateRequest: MessageHandler<
  PuzzleCreateRequest,
  PuzzleCreateResponse
> = async ({ message, context }) => {
  const { userId, subredditName } = context;
  if (!userId || !subredditName) {
    return {
      type: "PUZZLE_CREATE_RESPONSE",
      success: false,
      error: "No userId or subredditName was present in the context",
    };
  }

  const user = await context.reddit.getUserById(userId);
  if (!user) {
    return {
      type: "PUZZLE_CREATE_RESPONSE",
      success: false,
      error: `No user was found by the ID:${userId}`,
    };
  }

  const puzzleService = new PuzzleService(context);
  const { post } = await puzzleService.create(subredditName, {
    topic: message.data.topic,
    clue: message.data.clue,
    createdBy: user.id,
    createdByUsername: user.username,
  });

  context.ui.navigateTo(post);

  return {
    type: "PUZZLE_CREATE_RESPONSE",
    success: true,
  };
};
