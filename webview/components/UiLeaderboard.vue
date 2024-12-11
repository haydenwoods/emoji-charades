<template>
  <div class="grid grid-cols-[min-content_1fr_1fr] w-full gap-x-4 gap-y-2">
    <ui-leaderboard-item v-for="item in items" :key="item.username" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { LeaderboardItem } from "../../shared/types/message";

defineProps<{
  items: LeaderboardItem[];
}>();
</script>
