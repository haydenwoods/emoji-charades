import { readonly, ref } from "vue";
import { defineStore } from "pinia";

import { InitialDataEvent } from "@shared/types/message";
import { Player } from "@shared/types/db/player";
import { Puzzle } from "@shared/types/db/puzzle";

export enum Page {
  MENU,
  PLAY,
  CREATE_PUZZLE_SELECT_TOPIC,
  CREATE_PUZZLE_TYPE_CLUE,
  GUESS_PUZZLE,
  PUZZLE_SUMMARY,
  ABOUT,
  LEADERBOARD,
}

type LoadingOverlayData = {
  id: "CREATE_REQUEST" | "GUESS_PUZZLE_REQUEST" | "GET_LEADERBOARD_REQUEST";
  label: string;
};

export const useAppStore = defineStore("app", () => {
  const loading = ref<boolean>(true);
  const showLoadingOverlay = ref<boolean>(false);
  const loadingOverlayData = ref<LoadingOverlayData>();

  const page = ref<Page>(Page.MENU);

  const user = ref<InitialDataEvent["data"]["user"]>();
  const player = ref<Player>();

  const puzzle = ref<Puzzle>();

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
    player,

    puzzle,

    navigateTo,
  };
});
