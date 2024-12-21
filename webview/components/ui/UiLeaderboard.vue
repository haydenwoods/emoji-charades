<template>
  <div class="grid grid-cols-[min-content_1fr_1fr] w-full gap-x-4 gap-y-2">
    <ui-leaderboard-item
      v-for="item in items.slice(0, MAX_ITEMS)"
      :key="item.username"
      v-bind="item"
    />
    <ui-leaderboard-item v-if="you && you.rank > MAX_ITEMS" v-bind="you" />
  </div>
</template>

<script setup lang="ts">
import { LeaderboardItem } from "../../../shared/types/leaderboard";

const MAX_ITEMS: number = 10;

defineProps<{
  items: LeaderboardItem[];
  you?: LeaderboardItem;
}>();
</script>
