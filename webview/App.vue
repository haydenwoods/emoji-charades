<template>
  <div class="size-full p-4 sm:p-6">
    <loading-page v-if="loading" />

    <transition v-else name="fade" mode="out-in">
      <component :is="PAGE_TO_COMPONENT[page]" :key="page" />
    </transition>

    <app-notifications />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { PAGE_TO_COMPONENT } from "./constants/pages";

import { useAppStore } from "./stores/app";

import { sendMessage } from "./utils/messages";

import { useMessageListener } from "./composables/useMessageListener";

import { onPuzzleCreateResponse } from "./messages/onPuzzleCreateResponse";
import { onWebviewMountedResponse } from "./messages/onWebviewMountedResponse";

import { PuzzleCreateResponse, WebviewMountedResponse } from "../shared/types/message";

import LoadingPage from "./pages/LoadingPage.vue";

const appStore = useAppStore();
const { loading, page } = storeToRefs(appStore);

useMessageListener<WebviewMountedResponse>("WEBVIEW_MOUNTED_RESPONSE", onWebviewMountedResponse);
useMessageListener<PuzzleCreateResponse>("PUZZLE_CREATE_RESPONSE", onPuzzleCreateResponse);

useMessageListener("*", (message) => {
  console.log(`Received message (${message.type})`, message);
});

onMounted(() => {
  sendMessage({
    type: "WEBVIEW_MOUNTED_REQUEST",
    data: undefined,
  });
});
</script>
