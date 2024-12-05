import { ref } from "vue";
import { defineStore } from "pinia";

import { UserDataEvent } from "@shared/types/message";

export enum Page {
  CREATE_CHOOSE_TOPIC,
  CREATE_TYPE,
}

export const useAppStore = defineStore("app", () => {
  const user = ref<UserDataEvent["data"]["user"]>();
  const page = ref<Page>(Page.CREATE_CHOOSE_TOPIC);

  return {
    user,
    page,
  };
});
