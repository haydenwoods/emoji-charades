import { readonly, ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";
import { DBUser } from "@shared/types/db/user";
import { animate } from "motion";

export enum Page {
  MENU,
  CREATE,
  GUESS,
  SUMMARY,
}

type LoadingOverlayData = {
  id: "CREATE_REQUEST" | "GUESS_REQUEST";
  label: string;
};

export const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(true);
  const loadingOverlayData = ref<LoadingOverlayData>();
  const page = ref<Page>(Page.MENU);

  const user = ref<InitialDataEvent["data"]["user"]>();
  const dbUser = ref<DBUser>();

  const navigateTo = (newPage: Page) => {
    page.value = newPage;
  };

  const startLoadingOverlay = (data: LoadingOverlayData) => {
    loadingOverlayData.value = data;

    animate([
      ["#loading-overlay", { opacity: [0, 1] }, { duration: 0.1 }],
      [
        "#loading-overlay-modal",
        { opacity: [0, 1], scale: [0.6, 1] },
        { type: "spring", duration: 0.4 },
      ],
    ]);
  };

  const stopLoadingOverlay = (id?: LoadingOverlayData["id"]) => {
    if (id && id !== loadingOverlayData.value?.id) return;
    animate([["#loading-overlay", { opacity: [1, 0] }, { duration: 0.2 }]]).then(() => {
      loadingOverlayData.value = undefined;
    });
  };

  return {
    loading,
    loadingOverlayData: readonly(loadingOverlayData),
    startLoadingOverlay,
    stopLoadingOverlay,
    page: readonly(page),
    user,
    dbUser,
    navigateTo,
  };
});
