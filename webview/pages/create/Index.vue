<template>
  <div class="size-full flex flex-col items-center justify-center">
    <header class="w-full flex">
      <!-- Left -->
      <div class="flex-1">
        <ui-button variant="plain" size="sm" :padded="false" @click="onBackToMenuClicked">
          <template #icon>
            <i-material-symbols-arrow-back-rounded class="text-xl" />
          </template>

          <template #default>
            <span class="font-medium"> Back to Menu </span>
          </template>
        </ui-button>
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
    <create-stage-topic v-if="stage === CreateStage.TOPIC" />
    <create-stage-phrase v-else-if="stage === CreateStage.PHRASE" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore, CreateStage } from "../../stores/create";
import { Page, useAppStore } from "../../stores/app";

import CreateStageTopic from "./stages/CreateStageTopic.vue";
import CreateStagePhrase from "./stages/CreateStagePhrase.vue";

const appStore = useAppStore();
const createStore = useCreateStore();
const { stage, topic } = storeToRefs(createStore);

const onBackToMenuClicked = () => {
  appStore.navigateTo(Page.MENU);
};

onMounted(() => {
  createStore.navigateTo(CreateStage.TOPIC);
});
</script>
