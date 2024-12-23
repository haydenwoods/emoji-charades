import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { useAppStore } from "./app";

import { getRandomTopic } from "../utils/topic";

import { Topic } from "@shared/types/db/topic";

export const REROLL_TOPIC_MAX: number = 5;

export const useCreateStore = defineStore("create", () => {
  const appStore = useAppStore();

  const topic = ref<Topic>(getRandomTopic(appStore.topics));
  const topicCategory = computed(() => {
    return appStore.topicCategories.find(({ name }) => name === topic.value.category);
  });

  const rerollTopicExclude = ref<Topic[]>([]);
  const rerollTopicCount = ref<number>(0);
  const rerollTopicRemaining = ref<number>();

  const rerollTopicDisabled = computed<boolean>(() => {
    if (rerollTopicRemaining.value === 0) return true;
    if (rerollTopicCount.value >= REROLL_TOPIC_MAX) return true;
    return false;
  });

  const rerollTopic = () => {
    rerollTopicExclude.value.push(topic.value);
    topic.value = getRandomTopic(appStore.topics, rerollTopicExclude.value);
    rerollTopicCount.value += 1;
  };

  return {
    topic,
    topicCategory,

    rerollTopicCount,
    rerollTopicDisabled,
    rerollTopic,
  };
});
