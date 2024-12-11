<template>
  <div class="size-full flex flex-col items-center justify-between">
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
        :label="newTopicLabel"
        :disabled="newTopicDisabled"
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
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { Page, useAppStore } from "../../stores/app";
import { useCreateStore } from "../../stores/create";

import { getRandomTopic } from "../../../shared/utils/topics";

import { Topic } from "../../../shared/types/topic";

const NEW_TOPIC_COUNT_MAX: number = 5;

const appStore = useAppStore();
const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const excludeTopics = ref<Topic[]>([]);
const hasTopicsRemaining = ref(true);

const newTopicCount = ref<number>(0);

const newTopicLabel = computed<string>(() => {
  if (newTopicCount.value === 0) {
    return "I don't know it";
  } else {
    return `${newTopicCount.value}/${NEW_TOPIC_COUNT_MAX} re-rolls`;
  }
});

const newTopicDisabled = computed<boolean>(() => {
  return !hasTopicsRemaining.value || newTopicCount.value >= NEW_TOPIC_COUNT_MAX;
});

const onNewTopicClicked = () => {
  // Add the current topic to the excludes (so it doesn't come up again)
  excludeTopics.value.push(topic.value);
  // Get the next topic randomly
  const { topic: randomTopic, remaining } = getRandomTopic({ exclude: excludeTopics.value });
  if (!topic) return;
  topic.value = randomTopic;
  // Check if there is no other topics remaining, set hasTopicsRemaining accordingly
  newTopicCount.value++;
  if (remaining === 0) {
    hasTopicsRemaining.value = false;
  }
};

const onStartClicked = () => {
  appStore.navigateTo(Page.CREATE_TYPE_CLUE);
};
</script>
