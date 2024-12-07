import { ref } from "vue";
import { defineStore } from "pinia";

import { Topic } from "../../shared/types/topic";
import { getRandomTopic } from "../../shared/utils/topics";

export enum CreateStage {
  TOPIC,
  PHRASE,
}

export const useCreateStore = defineStore("create", () => {
  const stage = ref<CreateStage>(CreateStage.TOPIC);

  const topic = ref<Topic>(getRandomTopic().topic);

  return {
    stage,
    topic,
  };
});
