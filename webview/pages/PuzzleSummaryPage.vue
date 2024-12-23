<template>
  <div v-if="puzzleSummary" class="size-full flex flex-col gap-y-6 items-center justify-between">
    <ui-page-header class="pop-in">
      <template #left>
        <ui-button size="xs" variant="plain" @click="appStore.navigateTo(Page.ABOUT)">
          <template #icon>
            <i-material-symbols-help-outline-rounded class="text-xl sm:text-2xl" />
          </template>
        </ui-button>
      </template>

      <template #title>
        <div class="flex flex-col gap-y-1">
          <ui-topic-title :topic="topic" :topic-category="topicCategory" past-tense />
          <ui-emojis :animate="false" :emojis="puzzle?.clue" size="xs" />
        </div>
      </template>
    </ui-page-header>

    <div v-if="puzzleSummary?.mostCommonGuesses.length" class="flex flex-col gap-y-4 w-full">
      <div
        v-for="puzzleGuess in puzzleSummary.mostCommonGuesses"
        :key="puzzleGuess.guess"
        class="pop-in py-1.5 px-4 bg-slate-200 w-full relative rounded-full overflow-hidden"
      >
        <div class="flex items-center relative z-10 gap-x-2.5">
          <span class="font-medium text-amber-950">{{ puzzleGuess.rank }}.</span>
          <span class="font-medium text-amber-950">{{ puzzleGuess.guess }}</span>
          <span class="font-medium text-slate-800 text-sm ml-auto">
            <template v-if="puzzleGuess.count === 1"> 1 guess </template>
            <template v-else> {{ puzzleGuess.count }} guesses </template>
          </span>
        </div>

        <div
          class="absolute z-0 bg-amber-300 h-full top-0 left-0"
          :style="{ width: `${puzzleGuess.percentage}%` }"
        ></div>
      </div>
    </div>

    <ui-buttons-row class="pop-in">
      <ui-button
        label="Create your own"
        variant="secondary"
        @click="appStore.navigateTo(Page.CREATE_PUZZLE_SELECT_TOPIC)"
      >
        <template #icon>
          <i-noto-plus />
        </template>
      </ui-button>

      <ui-button label="Play another!" @click="appStore.navigateTo(Page.PLAY)">
        <template #icon>
          <i-noto-play-button />
        </template>
      </ui-button>
    </ui-buttons-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted } from "vue";

import { Page, useAppStore } from "../stores/app";
import { useNotificationStore } from "../stores/notification";

import { animatePop } from "../utils/animate";
import { sendMessage } from "../utils/messages";

import { useMessageListener } from "../composables/useMessageListener";

import { PuzzleSummaryResponse } from "../../shared/types/message";

const appStore = useAppStore();
const notificationStore = useNotificationStore();
const { puzzle, puzzleSummary } = storeToRefs(appStore);

const topic = computed(() => {
  return puzzle.value?.topic;
});

const topicCategory = computed(() => {
  return appStore.topicCategories.find(({ name }) => name === topic.value.category);
});

useMessageListener<PuzzleSummaryResponse>("PUZZLE_SUMMARY_RESPONSE", (message) => {
  puzzleSummary.value = message.data?.puzzleSummary;
  notificationStore.hideNotification("PUZZLE_SUMMARY_REQUEST");

  nextTick(() => {
    animatePop(".pop-in", "in", true);
  });
});

onMounted(() => {
  if (!puzzleSummary.value) {
    notificationStore.showLoading("PUZZLE_SUMMARY_REQUEST");

    sendMessage({
      type: "PUZZLE_SUMMARY_REQUEST",
      data: undefined,
    });
  } else {
    animatePop(".pop-in", "in", true);
  }
});
</script>
