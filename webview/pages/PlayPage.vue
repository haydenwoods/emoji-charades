<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAppStore } from "../stores/app";

import { sendMessage } from "../utils/messages";

const appStore = useAppStore();

onMounted(() => {
  appStore.startLoadingOverlay("PLAY_REQUEST", "Finding a new puzzle");

  sendMessage({
    type: "PLAY_REQUEST",
  });
});
</script>
