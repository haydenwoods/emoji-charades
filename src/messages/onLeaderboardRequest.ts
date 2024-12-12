import { sendMessage } from "@/utils/message.js";

import { KEY as USER_XP_KEY } from "@/utils/user-xp.js";

import { LeaderboardItem, GetLeaderboardRequest } from "@shared/types/message.js";
import { MessageHandler } from "@/types/message.js";

export const onLeaderboardRequest: MessageHandler<GetLeaderboardRequest> = async ({ context }) => {
  const { userId } = context;
  if (!userId) return;

  const elements = await context.redis.zRange(USER_XP_KEY, 0, 9);
  const usernames = await Promise.all(
    elements.map(async ({ member: userId }) => {
      const user = await context.reddit.getUserById(userId);
      return user?.username;
    }),
  );

  const leaderboard = elements.map<LeaderboardItem>(({ score: xp }, index) => ({
    username: usernames[index] ?? "Unknown username",
    xp,
    rank: index + 1,
  }));

  sendMessage(context, {
    type: "GET_LEADERBOARD_RESPONSE",
    data: {
      leaderboard,
    },
  });
};
