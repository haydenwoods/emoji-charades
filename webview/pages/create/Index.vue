<template>
  <select-topic v-if="stage === CreateStage.SELECT_TOPIC" />
  <create-clue v-else-if="stage === CreateStage.CREATE_CLUE" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore, CreateStage } from "../../stores/create";
import { Page, useAppStore } from "../../stores/app";

import SelectTopic from "./stages/SelectTopic.vue";
import CreateClue from "./stages/CreateClue.vue";

const appStore = useAppStore();
const createStore = useCreateStore();
const { stage, topic } = storeToRefs(createStore);

const onBackToMenuClicked = () => {
  appStore.navigateTo(Page.MENU);
};

onMounted(() => {
  createStore.navigateTo(CreateStage.SELECT_TOPIC);
});
</script>
