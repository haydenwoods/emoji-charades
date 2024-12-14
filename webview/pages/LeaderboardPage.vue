<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="Leaderboard" @click:back="appStore.navigateTo(Page.MENU)">
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

import { Page, useAppStore } from "../stores/app";
import { useLeaderboardStore } from "../stores/leaderboard";

import { sendMessage } from "../utils/messages";

import { LeaderboardResponse, LeaderboardItem } from "../../shared/types/message";
import { useMessageListener } from "../composables/useMessageListener";

const appStore = useAppStore();
const leaderboardStore = useLeaderboardStore();
const { player, playerXP, playerRank } = storeToRefs(appStore);
const { leaderboard } = storeToRefs(leaderboardStore);

const you = computed<LeaderboardItem | undefined>(() => {
  if (!player.value) return;
  return {
    username: "You",
    xp: playerXP.value,
    rank: playerRank.value,
  };
});

useMessageListener<LeaderboardResponse>("LEADERBOARD_RESPONSE", ({ data }) => {
  leaderboard.value = data.leaderboard;
  appStore.stopLoadingOverlay("LEADERBOARD_REQUEST");
});

onMounted(() => {
  appStore.startLoadingOverlay({ id: "LEADERBOARD_REQUEST", label: "Loading" });

  sendMessage({
    type: "LEADERBOARD_REQUEST",
  });
});
</script>
