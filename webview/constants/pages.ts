import { type Component } from "vue";

import { Page } from "@/stores/app";

import MenuPage from "@/pages/MenuPage.vue";
import PlayPage from "@/pages/PlayPage.vue";
import CreatePuzzleSelectTopicPage from "@/pages/create-puzzle/SelectTopicPage.vue";
import CreatePuzzleTypeCluePage from "@/pages/create-puzzle/TypeCluePage.vue";
import GuessPuzzlePage from "@/pages/GuessPuzzlePage.vue";
import PuzzleSummaryPage from "@/pages/PuzzleSummaryPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import LeaderboardPage from "@/pages/LeaderboardPage.vue";

export const PAGE_TO_COMPONENT: Record<Page, Component> = {
  [Page.MENU]: MenuPage,
  [Page.PLAY]: PlayPage,
  [Page.CREATE_PUZZLE_SELECT_TOPIC]: CreatePuzzleSelectTopicPage,
  [Page.CREATE_PUZZLE_TYPE_CLUE]: CreatePuzzleTypeCluePage,
  [Page.GUESS_PUZZLE]: GuessPuzzlePage,
  [Page.PUZZLE_SUMMARY]: PuzzleSummaryPage,
  [Page.ABOUT]: AboutPage,
  [Page.LEADERBOARD]: LeaderboardPage,
};
