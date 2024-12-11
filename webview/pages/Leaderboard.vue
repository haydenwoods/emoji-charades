<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="Leaderboard" @click:back="appStore.navigateTo(Page.MENU)">
      <template #title:icon>
        <i-noto-trophy />
      </template>
    </ui-page-header>
    <ui-leaderboard v-if="leaderboard" :items="leaderboard" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { Page, useAppStore } from "../stores/app";

import { sendMessage } from "../utils/messages";
import { useLeaderboardStore } from "../stores/leaderboard";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const leaderboardStore = useLeaderboardStore();
const { leaderboard } = storeToRefs(leaderboardStore);

onMounted(() => {
  appStore.startLoadingOverlay({ id: "LEADERBOARD_REQUEST", label: "Loading" });

  sendMessage({
    type: "LEADERBOARD_REQUEST",
  });
});
</script>
