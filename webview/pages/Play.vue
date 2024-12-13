<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAppStore } from "../stores/app";

import { sendMessage } from "../utils/messages";

const appStore = useAppStore();

onMounted(() => {
  appStore.startLoadingOverlay({
    id: "PLAY_REQUEST",
    label: "Finding a Puzzle",
  });

  sendMessage({
    type: "PLAY_REQUEST",
  });
});
</script>
