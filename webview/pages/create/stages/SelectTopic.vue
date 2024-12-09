<template>
  <div class="size-full flex flex-col items-center justify-between">
    <div class="flex flex-col items-center gap-y-4 my-auto">
      <div class="flex items-center gap-x-2.5">
        <h2 class="text-xl text-neutral-800 font-medium">Your topic is a</h2>
        <span
          class="rounded-full px-2.5 py-1 inline-flex items-center gap-x-2 border-2"
          :class="
            {
              blue: 'bg-blue-200 text-blue-900 border-blue-300',
              orange: 'bg-orange-200 text-orange-900 border-orange-300',
              red: 'bg-red-200 text-red-900 border-red-300',
              emerald: 'bg-green-200 text-green-900 border-green-300',
              purple: 'bg-purple-200 text-purple-900 border-purple-300',
              indigo: 'bg-indigo-200 text-indigo-900 border-indigo-300',
              yellow: 'bg-yellow-200 text-yellow-900 border-yellow-300',
              amber: 'bg-amber-200 text-amber-900 border-amber-300',
            }[topicCategoryData.color]
          "
        >
          <span class="text-xl font-emoji">{{ topicCategoryData.emoji }}</span>
          <span class="text-xl font-medium">{{ topicCategoryData.name }}</span>
        </span>
      </div>
      <h1 class="text-5xl text-neutral-950 font-semibold text-center">"{{ topic.name }}"</h1>
    </div>

    <div class="flex items-end gap-x-4">
      <ui-button
        :label="newTopicLabel"
        emoji="🤷‍♂️"
        variant="secondary"
        :disabled="newTopicDisabled"
        @click="onNewTopicClicked"
      />

      <ui-button label="Let's start!" emoji="▶️" variant="primary" @click="onStartClicked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore, CreateStage } from "../../../stores/create";

import { CATEGORY_DATA } from "../../../../shared/constants/categories";

import { getRandomTopic } from "../../../../shared/utils/topics";

import { Topic } from "../../../../shared/types/topic";
import { CategoryData } from "../../../../shared/types/category";

const NEW_TOPIC_COUNT_MAX: number = 5;

const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const excludeTopics = ref<Topic[]>([]);
const hasTopicsRemaining = ref(true);

const newTopicCount = ref<number>(0);

const topicCategoryData = computed<CategoryData>(() => {
  return CATEGORY_DATA[topic.value.category];
});

const newTopicLabel = computed<string>(() => {
  if (newTopicCount.value === 0) {
    return "I don't know it";
  } else {
    return `${newTopicCount.value}/${NEW_TOPIC_COUNT_MAX} rolls`;
  }
});

const newTopicDisabled = computed<boolean>(() => {
  return !hasTopicsRemaining.value || newTopicCount.value >= NEW_TOPIC_COUNT_MAX;
});

// TODO: Impose a limit on how many re-rolls you get
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
  createStore.navigateTo(CreateStage.CREATE_CLUE);
};
</script>
