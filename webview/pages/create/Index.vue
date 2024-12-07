<template>
  <div class="size-full flex flex-col items-center justify-center">
    <header class="w-full flex">
      <!-- Left -->
      <div class="flex-1">
        <button type="button" class="flex items-center gap-x-2" @clicked="onBackToMenuClicked">
          <i-material-symbols-arrow-back-rounded class="text-xl" />
          <span class="font-medium">Back to Menu</span>
        </button>
      </div>

      <!-- Middle -->
      <div class="flex-1">
        <h1 v-if="stage === CreateStage.PHRASE" class="text-xl text-center font-semibold">
          "{{ topic.name }}"
        </h1>
      </div>

      <!-- Right -->
      <div class="flex-1"></div>
    </header>

    <!-- Stages -->
    <create-topic v-if="stage === CreateStage.TOPIC" />
    <create-phrase v-else-if="stage === CreateStage.PHRASE" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCreateStore, CreateStage } from "../../stores/create";

import { sendMessage } from "../../utils/messages";

const createStore = useCreateStore();
const { stage, topic } = storeToRefs(createStore);

const onBackToMenuClicked = () => {
  sendMessage({
    type: "BACK_TO_MENU_EVENT",
  });
};
</script>
