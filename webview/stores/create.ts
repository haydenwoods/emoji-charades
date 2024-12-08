import { readonly, ref } from "vue";
import { defineStore } from "pinia";

import { Topic } from "../../shared/types/topic";
import { getRandomTopic } from "../../shared/utils/topics";

export enum CreateStage {
  SELECT_TOPIC,
  CREATE_CLUE,
}

export const useCreateStore = defineStore("create", () => {
  const stage = ref<CreateStage>(CreateStage.SELECT_TOPIC);

  const topic = ref<Topic>(getRandomTopic().topic);

  const navigateTo = (newStage: CreateStage) => {
    stage.value = newStage;
  };

  return {
    stage: readonly(stage),
    topic,
    navigateTo,
  };
});
