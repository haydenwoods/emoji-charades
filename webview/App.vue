<template>
  <div class="size-full p-6 md:p-8">
    <loading-page v-if="loading" />

    <transition v-else name="page" mode="out-in">
      <menu-page v-if="page === Page.MENU" />
      <create-page v-else-if="page === Page.CREATE" />
      <guess-page v-else-if="page === Page.GUESS" />
      <summary-page v-else-if="page === Page.SUMMARY" />
      <about-page v-else-if="page == Page.ABOUT" />
    </transition>

    <!-- Loading overlay -->
    <ui-overlay :open="showLoadingOverlay" :label="loadingOverlayData?.label">
      <template #icon>
        <ui-loader />
      </template>
    </ui-overlay>
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
import AboutPage from "./pages/About.vue";

const appStore = useAppStore();
const { loading, showLoadingOverlay, loadingOverlayData, page } = storeToRefs(appStore);

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

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
