import { ref } from "vue";
import { defineStore } from "pinia";

import { Topic } from "../../shared/types/topic";
import { getRandomTopic } from "../../shared/utils/topics";

export const useCreateStore = defineStore("create", () => {
  const topic = ref<Topic>(getRandomTopic().topic);

  return {
    topic,
  };
});
