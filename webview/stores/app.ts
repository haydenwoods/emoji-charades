import { readonly, ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";

export enum Page {
  MENU,
  CREATE,
  GUESS,
}

export const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(true);
  const page = ref<Page>(Page.MENU);
  const user = ref<InitialDataEvent["data"]["user"]>();

  const navigateTo = (newPage: Page) => {
    page.value = newPage;
  };

  return {
    loading,
    page: readonly(page),
    user,
    navigateTo,
  };
});
