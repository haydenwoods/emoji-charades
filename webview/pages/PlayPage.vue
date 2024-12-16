<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useNotificationStore } from "../stores/notification";

import { sendMessage } from "../utils/messages";

const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.showLoading("PLAY_REQUEST", "Finding a new puzzle");

  sendMessage({
    type: "PLAY_REQUEST",
  });
});
</script>
