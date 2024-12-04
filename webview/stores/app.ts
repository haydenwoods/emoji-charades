import { ref } from "vue";
import { defineStore } from "pinia";

import { WebViewMountedResponse } from "@shared/types/message";

export enum Page {
  CREATE_CHOOSE_TOPIC,
  CREATE_TYPE,
}

export const useAppStore = defineStore("app", () => {
  const user = ref<WebViewMountedResponse["data"]["user"]>();
  const page = ref<Page>(Page.CREATE_CHOOSE_TOPIC);

  return {
    user,
    page,
  };
});
