import { getObject } from "@/utils/db/index.js";
import { getPlayerKey } from "@/utils/db/keys.js";
import { sendMessage } from "@/utils/message.js";

import { PlayRequest, PlayResponse } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";
import { Player } from "@shared/types/db/player.js";

export const onPlayRequest: MessageHandler<PlayRequest> = async ({ context }) => {
  const sendErrorMessage = (error?: PlayResponse["data"]["error"]): void => {
    sendMessage(context, {
      type: "PLAY_RESPONSE",
      data: {
        success: false,
        error: error ?? "Unable to find a new puzzle",
      },
    });
  };

  const { subredditName, userId } = context;
  if (!userId) return sendErrorMessage();

  const player = await getObject<Player>(context.redis, getPlayerKey(userId));
  if (!player) return sendErrorMessage();

  const completedPuzzleIds = player.completedPuzzles
    .filter(({ completedAt }) => Boolean(completedAt))
    .map(({ id }) => id);

  const newPosts = await context.reddit
    .getNewPosts({
      subredditName,
      limit: 100,
      pageSize: 100,
    })
    .all();

  const uncompletedPosts = newPosts.filter(({ id }) => !completedPuzzleIds.includes(id));
  if (uncompletedPosts.length <= 0) return sendErrorMessage();

  const post = uncompletedPosts[0];

  context.ui.navigateTo(post);

  sendMessage(context, {
    type: "PLAY_RESPONSE",
    data: {
      success: true,
    },
  });
};
