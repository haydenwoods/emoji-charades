import { ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";

export enum Page {
  CREATE,
  GUESS,
}

export const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(true);
  const page = ref<Page>(Page.CREATE);
  const user = ref<InitialDataEvent["data"]["user"]>();

  return {
    loading,
    page,
    user,
  };
});
