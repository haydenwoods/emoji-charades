import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { Topic } from "../../shared/types/topic";
import { getRandomTopic } from "../../shared/utils/topics";

export const REROLL_TOPIC_MAX: number = 5;

export const useCreateStore = defineStore("create", () => {
  const topic = ref<Topic>(getRandomTopic().topic);

  const rerollTopicExclude = ref<Topic[]>([]);
  const rerollTopicCount = ref<number>(0);
  const rerollTopicRemaining = ref<number>();

  const rerollTopicDisabled = computed<boolean>(() => {
    if (rerollTopicRemaining.value === 0) return true;
    if (rerollTopicCount.value >= REROLL_TOPIC_MAX) return true;
    return false;
  });

  const rerollTopic = () => {
    // Add the current topic to the excludes (so it doesn't come up again)
    rerollTopicExclude.value.push(topic.value);

    // Get the next topic randomly
    const { topic: randomTopic, remaining } = getRandomTopic({
      exclude: rerollTopicExclude.value,
    });

    if (!topic) return;
    topic.value = randomTopic;

    // Check if there is no other topics remaining, set hasTopicsRemaining accordingly
    rerollTopicCount.value += 1;
    rerollTopicRemaining.value = remaining;
  };

  return {
    topic,

    rerollTopicCount,
    rerollTopicDisabled,
    rerollTopic,
  };
});
