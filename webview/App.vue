<template>
  <div v-if="!loading" class="size-full p-6 md:p-8">
    <menu-page v-if="page === Page.MENU" />
    <create-page v-else-if="page === Page.CREATE" />
    <guess-page v-else-if="page === Page.GUESS" />
    <summary-page v-else-if="page === Page.SUMMARY" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app";

import { sendMessage } from "./utils/messages";

import { onInitialDataEvent } from "./messages/onInitialDataEvent";

import { Message } from "../shared/types/message";
import { MessageHandler } from "./types/message";

import MenuPage from "./pages/menu/Index.vue";
import CreatePage from "./pages/create/Index.vue";
import GuessPage from "./pages/guess/Index.vue";
import SummaryPage from "./pages/summary/Index.vue";

const appStore = useAppStore();
const { loading, page } = storeToRefs(appStore);

const MESSAGE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  INITIAL_DATA_EVENT: onInitialDataEvent,
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
