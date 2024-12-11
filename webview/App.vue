<template>
  <div class="size-full p-6 md:p-8">
    <loading-page v-if="loading" />

    <transition v-else name="fade" mode="out-in">
      <component :key="page" :is="PAGE_TO_COMPONENT[page]" />
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
import { type Component, onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app";

import { sendMessage } from "./utils/messages";

import { onInitialDataEvent } from "./messages/onInitialDataEvent";
import { onCreateResponse } from "./messages/onCreateResponse";
import { onLeaderboardResponse } from "./messages/onLeaderboardResponse";

import { Message } from "../shared/types/message";
import { MessageHandler } from "./types/message";

import LoadingPage from "./pages/Loading.vue";
import MenuPage from "./pages/menu/Index.vue";
import CreateSelectTopicPage from "./pages/create/CreateSelectTopic.vue";
import CreateTypeCluePage from "./pages/create/CreateTypeClue.vue";
import GuessPage from "./pages/guess/Index.vue";
import SummaryPage from "./pages/summary/Index.vue";
import AboutPage from "./pages/About.vue";
import LeaderboardPage from "./pages/Leaderboard.vue";

const appStore = useAppStore();
const { loading, showLoadingOverlay, loadingOverlayData, page } = storeToRefs(appStore);

const PAGE_TO_COMPONENT: Record<Page, Component> = {
  [Page.MENU]: MenuPage,
  [Page.CREATE_SELECT_TOPIC]: CreateSelectTopicPage,
  [Page.CREATE_TYPE_CLUE]: CreateTypeCluePage,
  [Page.GUESS]: GuessPage,
  [Page.SUMMARY]: SummaryPage,
  [Page.ABOUT]: AboutPage,
  [Page.LEADERBOARD]: LeaderboardPage,
};

const MESSAGE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  INITIAL_DATA_EVENT: onInitialDataEvent,
  CREATE_RESPONSE: onCreateResponse,
  LEADERBOARD_RESPONSE: onLeaderboardResponse,
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
