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

import { onInitialDataEvent } from "./messages/onInitialDataEvent";
import { onCreateResponse } from "./messages/onCreateResponse";

import { CreateResponse, InitialDataEvent } from "../shared/types/message";

import LoadingPage from "./pages/LoadingPage.vue";

const appStore = useAppStore();
const { loading, page } = storeToRefs(appStore);

useMessageListener<InitialDataEvent>("INITIAL_DATA_EVENT", onInitialDataEvent);
useMessageListener<CreateResponse>("CREATE_RESPONSE", onCreateResponse);

onMounted(() => {
  sendMessage({
    type: "MOUNTED_EVENT",
  });
});
</script>
