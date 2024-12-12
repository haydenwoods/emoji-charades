import { useLeaderboardStore } from "../stores/leaderboard";

import { useAppStore } from "../stores/app";

import { MessageHandler } from "../types/message";
import { GetLeaderboardResponse } from "../../shared/types/message";

export const onLeaderboardResponse: MessageHandler<GetLeaderboardResponse> = ({ message }) => {
  const { leaderboard } = message.data;

  const leaderboardStore = useLeaderboardStore();
  leaderboardStore.leaderboard = leaderboard;

  const appStore = useAppStore();
  appStore.stopLoadingOverlay("GET_LEADERBOARD_REQUEST");
};
