<template>
  <div class="size-full flex flex-col gap-y-4 items-center justify-center">
    <div class="flex flex-col items-center gap-y-5 my-auto">
      <div class="flex items-center gap-x-3">
        <h2 class="text-xl text-neutral-800 font-medium">Your topic is a</h2>
        <span
          class="rounded-full px-2.5 py-1 inline-flex items-center gap-x-1.5"
          :class="
            {
              blue: 'bg-blue-300 text-blue-950',
              orange: 'bg-orange-300 text-orange-950',
              red: 'bg-red-300 text-red-950',
              emerald: 'bg-emerald-300 text-emerald-950',
            }[topicCategoryData.color]
          "
        >
          <span class="text-xl">{{ topicCategoryData.emoji }}</span>
          <span class="text-lg font-medium">{{ topicCategoryData.name }}</span>
        </span>
      </div>
      <h1 class="text-5xl text-neutral-950 font-semibold text-center">"{{ topic.name }}"</h1>
    </div>

    <div class="flex items-end gap-x-4">
      <ui-button
        label="I don't know it"
        emoji="🤷‍♂️"
        variant="secondary"
        :disabled="!hasTopicsRemaining"
        @click="onNewTopicClicked"
      />

      <ui-button label="Let's start!" emoji="▶️" variant="primary" @click="onStartClicked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { Page, useAppStore } from "../../stores/app";
import { useCreateStore } from "../../stores/create";

import { CATEGORY_DATA } from "../../../shared/constants/categories";

import { getRandomTopic } from "../../../shared/utils/topics";

import { Topic } from "../../../shared/types/topic";
import { CategoryData } from "../../../shared/types/category";

const appStore = useAppStore();
const createStore = useCreateStore();

const { page } = storeToRefs(appStore);
const { topic } = storeToRefs(createStore);

const excludeTopics = ref<Topic[]>([]);
const hasTopicsRemaining = ref(true);

const topicCategoryData = computed<CategoryData>(() => {
  return CATEGORY_DATA[topic.value.category];
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
  if (remaining === 0) {
    hasTopicsRemaining.value = false;
  }
};

const onStartClicked = () => {
  page.value = Page.CREATE_TYPE;
};
</script>
