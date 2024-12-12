<template>
  <div class="size-full flex flex-col items-center justify-between">
    <ui-page-header @click:back="appStore.navigateTo(Page.MENU)" />

    <transition name="fade" mode="out-in">
      <div :key="topic.name" class="flex flex-col items-center gap-y-4 my-auto">
        <div class="flex items-center gap-x-2.5">
          <h2 class="text-xl text-neutral-800 font-medium">Your topic is a</h2>
          <ui-topic-category-tag :category="topic.category" size="lg" />
        </div>
        <h1 class="text-5xl text-neutral-950 font-semibold text-center">"{{ topic.name }}"</h1>
      </div>
    </transition>

    <div class="flex items-end gap-x-4">
      <ui-button
        variant="secondary"
        :label="rerollTopicLabel"
        :disabled="rerollTopicDisabled"
        @click="onNewTopicClicked"
      >
        <template #icon>
          <i-noto-person-shrugging />
        </template>
      </ui-button>

      <ui-button label="Let's start!" variant="primary" @click="onStartClicked">
        <template #icon>
          <i-noto-play-button />
        </template>
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { Page, useAppStore } from "../../stores/app";
import { REROLL_TOPIC_MAX, useCreateStore } from "../../stores/create";

import { useThrottleFn } from "@vueuse/core";

const appStore = useAppStore();

const createStore = useCreateStore();
const { topic, rerollTopicCount, rerollTopicDisabled } = storeToRefs(createStore);

const rerollTopicLabel = computed<string>(() => {
  if (rerollTopicCount.value === 0) {
    return "I don't know it";
  } else {
    return `${rerollTopicCount.value}/${REROLL_TOPIC_MAX} re-rolls`;
  }
});

const onNewTopicClicked = useThrottleFn(createStore.rerollTopic, 500);

const onStartClicked = () => {
  appStore.navigateTo(Page.CREATE_PUZZLE_TYPE_CLUE);
};
</script>
