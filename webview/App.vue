<template>
  <div class="size-full p-3 sm:p-6">
    <create-choose-topic-page v-if="page === Page.CREATE_CHOOSE_TOPIC" />
    <create-type-page v-else-if="page === Page.CREATE_TYPE" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app.js";

import { sendMessage } from "./utils/messages/index.js";

const appStore = useAppStore();
const { page } = storeToRefs(appStore);

onMounted(() => {
  sendMessage({
    type: "WEBVIEW_MOUNTED_REQUEST",
  });

  document.documentElement.focus();
});
</script>
