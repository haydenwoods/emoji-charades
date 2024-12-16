import { sendMessage } from "@/utils/message.js";

import { PLAYER_XP_SORTED_SET_KEY } from "@/utils/player-xp.js";

import { LeaderboardItem, LeaderboardRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";

export const onLeaderboardRequest: MessageHandler<LeaderboardRequest> = async ({ context }) => {
  const elements = await context.redis.zRange(PLAYER_XP_SORTED_SET_KEY, 0, 9, {
    reverse: true,
    by: "rank",
  });
  const users = await Promise.all(
    elements.map(async ({ member: userId }) => {
      return await context.reddit.getUserById(userId);
    }),
  );

  const leaderboard = elements.map<LeaderboardItem>(({ score: xp }, index) => ({
    username: users[index]?.username ?? "Unknown username",
    xp,
    rank: index + 1,
  }));

  sendMessage(context, {
    type: "LEADERBOARD_RESPONSE",
    data: {
      leaderboard,
    },
  });
};
