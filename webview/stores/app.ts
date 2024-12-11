import { readonly, ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";
import { DBUser } from "@shared/types/db/user";
import { DBPost } from "@shared/types/db/post";

export enum Page {
  MENU,
  PLAY,
  CREATE_SELECT_TOPIC,
  CREATE_TYPE_CLUE,
  GUESS,
  SUMMARY,
  ABOUT,
  LEADERBOARD,
}

type LoadingOverlayData = {
  id: "CREATE_REQUEST" | "GUESS_REQUEST" | "LEADERBOARD_REQUEST";
  label: string;
};

export const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(true);
  const showLoadingOverlay = ref<boolean>(false);
  const loadingOverlayData = ref<LoadingOverlayData>();

  const page = ref<Page>(Page.MENU);

  const user = ref<InitialDataEvent["data"]["user"]>();
  const dbUser = ref<DBUser>();

  const dbPost = ref<DBPost>();

  const navigateTo = (newPage: Page) => {
    page.value = newPage;
  };

  const startLoadingOverlay = (data: LoadingOverlayData) => {
    loadingOverlayData.value = data;
    showLoadingOverlay.value = true;
  };

  const stopLoadingOverlay = (id?: LoadingOverlayData["id"]) => {
    if (id && id !== loadingOverlayData.value?.id) return;
    showLoadingOverlay.value = false;
  };

  return {
    loading,
    showLoadingOverlay,
    loadingOverlayData: readonly(loadingOverlayData),
    startLoadingOverlay,
    stopLoadingOverlay,

    page: readonly(page),

    user,
    dbUser,

    dbPost,

    navigateTo,
  };
});
