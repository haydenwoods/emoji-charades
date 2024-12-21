<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="Leaderboard" @click:back="appStore.navigateTo(appStore.mainPage)">
      <template #title:icon>
        <i-noto-trophy />
      </template>
    </ui-page-header>
    <ui-leaderboard v-if="leaderboard" :items="leaderboard" :you="you" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useAppStore } from "../stores/app";
import { useLeaderboardStore } from "../stores/leaderboard";
import { useNotificationStore } from "../stores/notification";

import { sendMessage } from "../utils/messages";

import { LeaderboardResponse } from "../../shared/types/message";
import { LeaderboardItem } from "../../shared/types/leaderboard";
import { useMessageListener } from "../composables/useMessageListener";

const appStore = useAppStore();
const notificationStore = useNotificationStore();
const leaderboardStore = useLeaderboardStore();
const { player, playerXP, playerRank } = storeToRefs(appStore);
const { leaderboard } = storeToRefs(leaderboardStore);

const you = computed<LeaderboardItem | undefined>(() => {
  if (!player.value || !playerXP.value || !playerRank.value) return;

  const leaderboardUsernames = leaderboard.value?.map(({ username }) => username) ?? [];
  const isOnLeaderboard = leaderboardUsernames.includes(player.value.username);
  if (isOnLeaderboard) return;

  return {
    username: "You",
    xp: playerXP.value,
    rank: playerRank.value,
  };
});

useMessageListener<LeaderboardResponse>("LEADERBOARD_RESPONSE", ({ data }) => {
  leaderboard.value = data.leaderboard;
  notificationStore.hideNotification("LEADERBOARD_REQUEST");
});

onMounted(() => {
  notificationStore.showLoading("LEADERBOARD_REQUEST");

  sendMessage({
    type: "LEADERBOARD_REQUEST",
  });
});
</script>
