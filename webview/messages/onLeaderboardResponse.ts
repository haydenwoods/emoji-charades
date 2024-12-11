import { useLeaderboardStore } from "../stores/leaderboard";

import { useAppStore } from "../stores/app";

import { MessageHandler } from "../types/message";
import { LeaderboardResponse } from "../../shared/types/message";

export const onLeaderboardResponse: MessageHandler<LeaderboardResponse> = ({ message }) => {
  const { leaderboard } = message.data;

  const leaderboardStore = useLeaderboardStore();
  leaderboardStore.leaderboard = leaderboard;

  const appStore = useAppStore();
  appStore.stopLoadingOverlay("LEADERBOARD_REQUEST");
};
