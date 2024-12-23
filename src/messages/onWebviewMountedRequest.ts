import { MessageHandler } from "./index.js";

import { WebviewMountedRequest, WebviewMountedResponse } from "@shared/types/message.js";

import { PlayerService } from "@/services/player.js";
import { PuzzleService } from "@/services/puzzle.js";

import { isPlayerPuzzleCompleted } from "@/utils/player.js";
import { TopicsService } from "@/services/topics.js";
import { TopicCategoriesService } from "@/services/topic-categories.js";

export const onWebviewMountedRequest: MessageHandler<
  WebviewMountedRequest,
  WebviewMountedResponse
> = async ({ context, app }) => {
  app.setWebviewMounted(true);

  const { userId, postId } = context;
  if (!userId || !postId) {
    return {
      type: "WEBVIEW_MOUNTED_RESPONSE",
      success: false,
      error: "No userId or postId in the context",
    };
  }

  const user = await context.reddit.getUserById(userId);
  if (!user) {
    return {
      type: "WEBVIEW_MOUNTED_RESPONSE",
      success: false,
      error: `No user found by the ID: ${userId}`,
    };
  }

  const playerService = new PlayerService(context);
  const puzzleService = new PuzzleService(context);
  const topicsService = new TopicsService(context);
  const topicCategoriesService = new TopicCategoriesService(context);

  const [player, playerXP, playerRank, puzzle, topics, topicCategories] = await Promise.all([
    playerService.getOrCreate(userId, {
      username: user.username,
      playedPuzzles: [],
    }),
    playerService.getXP(userId),
    playerService.getRank(userId),
    puzzleService.get(postId),
    topicsService.get(),
    topicCategoriesService.get(),
  ]);

  const isPuzzleCompleted = isPlayerPuzzleCompleted(player, postId);
  const puzzleSummary = isPuzzleCompleted ? await puzzleService.getSummary(postId) : undefined;

  return {
    type: "WEBVIEW_MOUNTED_RESPONSE",
    success: true,
    data: {
      user,
      player,
      playerXP,
      playerRank,
      puzzle,
      puzzleSummary,
      topics: topics ?? [],
      topicCategories: topicCategories ?? [],
    },
  };
};
