import { sendMessage } from "@/utils/message.js";
import { getPuzzleSummary } from "@/utils/puzzle-summary.js";

import { PuzzleSummaryRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";

export const onPuzzleSummaryRequest: MessageHandler<PuzzleSummaryRequest> = async ({ context }) => {
  const { postId } = context;
  if (!postId) return;

  const puzzleSummary = await getPuzzleSummary(context.redis, postId);

  sendMessage(context, {
    type: "PUZZLE_SUMMARY_RESPONSE",
    data: {
      puzzleSummary,
    },
  });
};
