import { MessageHandler } from "./index.js";

import { PUZZLE_FLAIR_ID } from "@/constants/flairs.js";

import { PlayerService } from "@/services/player.js";

import { getPlayerCompletedPuzzleIds } from "@/utils/player.js";

import { PlayRequest, PlayResponse } from "@shared/types/message.js";

export const onPlayRequest: MessageHandler<PlayRequest, PlayResponse> = async ({ context }) => {
  const { userId, subredditName } = context;
  if (!userId || !subredditName) {
    return {
      type: "PLAY_RESPONSE",
      success: false,
      error: "No userId or subredditName found in the context",
    };
  }

  const user = await context.reddit.getUserById(userId);
  if (!user) {
    return {
      type: "PLAY_RESPONSE",
      success: false,
      error: `No user found by the ID: ${userId}`,
    };
  }

  const playerService = new PlayerService(context);

  const player = await playerService.getOrCreate(userId, {
    username: user.username,
    playedPuzzles: [],
  });

  const completedPuzzleIds = getPlayerCompletedPuzzleIds(player);

  const posts = await context.reddit
    .getNewPosts({
      subredditName,
      limit: 100,
      pageSize: 100,
    })
    .all();

  const puzzlePosts = posts.filter(({ flair }) => flair?.templateId === PUZZLE_FLAIR_ID);
  const uncompletedPuzzlePosts = puzzlePosts.filter(({ id }) => !completedPuzzleIds.includes(id));

  if (uncompletedPuzzlePosts.length <= 0) {
    return {
      type: "PLAY_RESPONSE",
      success: false,
      error: "Unable to find an uncompleted puzzle",
    };
  }

  const puzzlePost = uncompletedPuzzlePosts[0];

  context.ui.navigateTo(puzzlePost);

  return {
    type: "PLAY_RESPONSE",
    success: true,
  };
};
