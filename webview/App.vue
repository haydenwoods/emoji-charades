<template>
  <div class="size-full p-6 md:p-8">
    <loading-page v-if="loading" />

    <menu-page v-else-if="page === Page.MENU" />
    <create-page v-else-if="page === Page.CREATE" />
    <guess-page v-else-if="page === Page.GUESS" />
    <summary-page v-else-if="page === Page.SUMMARY" />

    <!-- Loading overlay -->
    <div
      id="loading-overlay"
      class="fixed size-full bg-neutral-900/40 top-0 left-0 flex items-center justify-center opacity-0"
      :class="loadingOverlayData ? '' : 'pointer-events-none'"
    >
      <div
        id="loading-overlay-modal"
        class="bg-neutral-100 rounded-full flex items-center gap-y-2 shadow-md px-5 py-4 gap-2"
      >
        <i-material-symbols-progress-activity class="text-3xl animate-spin text-neutral-800" />
        <span class="text-2xl font-medium text-neutral-800">{{ loadingOverlayData?.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app";

import { sendMessage } from "./utils/messages";

import { onInitialDataEvent } from "./messages/onInitialDataEvent";
import { onCreateResponse } from "./messages/onCreateResponse";

import { Message } from "../shared/types/message";
import { MessageHandler } from "./types/message";

import LoadingPage from "./pages/Loading.vue";
import MenuPage from "./pages/menu/Index.vue";
import CreatePage from "./pages/create/Index.vue";
import GuessPage from "./pages/guess/Index.vue";
import SummaryPage from "./pages/summary/Index.vue";

const appStore = useAppStore();
const { loading, loadingOverlayData, page } = storeToRefs(appStore);

const MESSAGE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  INITIAL_DATA_EVENT: onInitialDataEvent,
  CREATE_RESPONSE: onCreateResponse,
};

useEventListener(window, "message", async (event) => {
  if (event.data.type === "devvit-message") {
    const message = event.data.data.message as Message;
    console.log(`Received message (${message.type})`, message);

    const messageHandler = MESSAGE_TO_HANDLER[message.type];
    await messageHandler?.({ message });
  }
});

onMounted(() => {
  sendMessage({
    type: "MOUNTED_EVENT",
  });
});
</script>
