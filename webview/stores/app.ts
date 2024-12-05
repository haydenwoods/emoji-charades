import { ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";

export enum Page {
  CREATE_CHOOSE_TOPIC,
  CREATE_TYPE,
  GUESS,
}

export const useAppStore = defineStore("app", () => {
  const user = ref<InitialDataEvent["data"]["user"]>();
  const page = ref<Page>(Page.CREATE_CHOOSE_TOPIC);

  return {
    user,
    page,
  };
});
