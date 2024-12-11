import { ref } from "vue";
import { defineStore } from "pinia";

import { LeaderboardItem } from "../../shared/types/message";

export const useLeaderboardStore = defineStore("leaderboard", () => {
  const leaderboard = ref<LeaderboardItem[]>();

  return {
    leaderboard,
  };
});
