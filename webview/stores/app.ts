import { ref } from "vue";
import { defineStore } from "pinia";

import { WebViewMountedResponse } from "@shared/types/message";

export const useAppStore = defineStore("app", () => {
  const user = ref<WebViewMountedResponse["data"]["user"]>();

  return {
    user,
  };
});
