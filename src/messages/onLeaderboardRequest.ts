import { MessageHandler } from "./index.js";

import { LeaderboardService } from "@/services/leaderboard.js";

import { LeaderboardRequest, LeaderboardResponse } from "@shared/types/message.js";

export const onLeaderboardRequest: MessageHandler<
  LeaderboardRequest,
  LeaderboardResponse
> = async ({ context }) => {
  const leaderboardService = new LeaderboardService(context);
  const leaderboard = await leaderboardService.getTop(10);

  return {
    type: "LEADERBOARD_RESPONSE",
    success: true,
    data: {
      leaderboard,
    },
  };
};
