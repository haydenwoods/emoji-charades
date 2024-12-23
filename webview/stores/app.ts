import { computed, readonly, ref } from "vue";
import { defineStore } from "pinia";

import { Player } from "../../shared/types/db/player";
import { Puzzle } from "../../shared/types/db/puzzle";
import { PuzzleSummary } from "../../shared/types/puzzle-summary";
import { User } from "../../shared/types/user";
import { Topic } from "../../shared/types/db/topic";
import { TopicCategory } from "../../shared/types/db/topic-category";

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

export const useAppStore = defineStore("app", () => {
  // Loading
  const loading = ref<boolean>(true);

  // Navigation
  const page = ref<Page>(Page.MENU);

  // Config
  const topics = ref<Topic[]>([]);
  const topicCategories = ref<TopicCategory[]>([]);

  // User / Player
  const user = ref<User>();
  const player = ref<Player>();
  const playerXP = ref<number>();
  const playerRank = ref<number>();

  // Puzzle
  const puzzle = ref<Puzzle>();
  const puzzleSummary = ref<PuzzleSummary>();

  const mainPage = computed<Page>(() => {
    if (!puzzle.value) {
      return Page.MENU;
    }

    const playedPuzzle = player.value?.playedPuzzles.find(({ id }) => id === puzzle.value!.id);
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

  return {
    loading,
    page: readonly(page),
    topics,
    topicCategories,
    user,
    player,
    playerXP,
    playerRank,
    puzzle,
    puzzleSummary,
    mainPage,
    navigateTo,
  };
});
