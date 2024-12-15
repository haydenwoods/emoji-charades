import { computed, readonly, ref } from "vue";
import { defineStore } from "pinia";

import { Player } from "../../shared/types/db/player";
import { Puzzle } from "../../shared/types/db/puzzle";
import { PuzzleSummary } from "../../shared/types/puzzle-summary";
import { User } from "../../shared/types/user";

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
  id: string;
  label: string;
};

export const useAppStore = defineStore("app", () => {
  // Loading
  const loading = ref<boolean>(true);
  const showLoadingOverlay = ref<boolean>(false);
  const loadingOverlayData = ref<LoadingOverlayData>();

  // Navigation
  const page = ref<Page>(Page.MENU);

  // User
  const user = ref<User>();
  const player = ref<Player>();
  const playerXP = ref<number>();
  const playerRank = ref<number>();

  // Puzzle
  const puzzle = ref<Puzzle>();
  const puzzleSummary = ref<PuzzleSummary>();

  const mainPage = computed<Page>(() => {
    if (!puzzle.value || !player.value) {
      return Page.MENU;
    }

    const playedPuzzle = player.value.playedPuzzles.find(({ id }) => id === puzzle.value!.id);
    const isPuzzleCompleted = Boolean(playedPuzzle?.completedAt);

    if (isPuzzleCompleted) {
      return Page.PUZZLE_SUMMARY;
    } else {
      return Page.GUESS_PUZZLE;
    }
  });

  const navigateTo = (newPage: Page) => {
    page.value = newPage;
  };

  const startLoadingOverlay = (id: string, label: string = "Loading") => {
    loadingOverlayData.value = { id, label };
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
    page: readonly(page),
    user,
    player,
    playerXP,
    playerRank,
    puzzle,
    puzzleSummary,
    mainPage,
    navigateTo,
    startLoadingOverlay,
    stopLoadingOverlay,
  };
});
