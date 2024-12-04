<template>
  <div class="size-full p-4 sm:p-8">
    <game-topic-page />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { sendMessage } from "@/utils/messages/index.js";

onMounted(() => {
  sendMessage({
    type: "WEBVIEW_MOUNTED_REQUEST",
  });

  document.documentElement.focus();
});
</script>
