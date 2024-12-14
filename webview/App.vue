<template>
  <div class="size-full p-6 md:p-8">
    <transition v-if="!loading" name="fade" mode="out-in">
      <component :is="PAGE_TO_COMPONENT[page]" :key="page" />
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
import { storeToRefs } from "pinia";

import { PAGE_TO_COMPONENT } from "./constants/pages";

import { useAppStore } from "./stores/app";

import { sendMessage } from "./utils/messages";

import { useMessageListener } from "./composables/useMessageListener";

import { onInitialDataEvent } from "./messages/onInitialDataEvent";
import { onCreateResponse } from "./messages/onCreateResponse";

import { CreateResponse, InitialDataEvent } from "../shared/types/message";

const appStore = useAppStore();
const { loading, showLoadingOverlay, loadingOverlayData, page } = storeToRefs(appStore);

useMessageListener<InitialDataEvent>("INITIAL_DATA_EVENT", onInitialDataEvent);
useMessageListener<CreateResponse>("CREATE_RESPONSE", onCreateResponse);

onMounted(() => {
  sendMessage({
    type: "MOUNTED_EVENT",
  });
});
</script>
