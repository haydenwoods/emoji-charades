<template>
  <div v-if="puzzleSummary" class="size-full flex flex-col gap-y-6 items-center justify-between">
    <ui-topic-title class="pop-in" :topic="topic" past-tense />

    <div v-if="puzzleSummary?.mostCommonGuesses.length" class="flex flex-col gap-y-4 w-full">
      <div
        v-for="puzzleGuess in puzzleSummary.mostCommonGuesses"
        :key="puzzleGuess.guess"
        class="pop-in py-1.5 px-4 bg-slate-200 w-full relative rounded-full overflow-hidden"
      >
        <div class="flex items-center relative z-10 gap-x-2">
          <span class="font-semibold text-slate-900">{{ puzzleGuess.rank }}.</span>
          <span class="font-semibold text-slate-900">{{ puzzleGuess.guess }}</span>
          <span class="font-medium text-slate-700"> ({{ puzzleGuess.count }} guesses) </span>
        </div>

        <div
          class="absolute z-0 bg-amber-200 h-full top-0 left-0"
          :style="{ width: `${puzzleGuess.percentage}%` }"
        ></div>
      </div>
    </div>

    <ui-buttons-row class="pop-in">
      <ui-button label="Play another!" @click="appStore.navigateTo(Page.PLAY)">
        <template #icon>
          <i-noto-play-button />
        </template>
      </ui-button>

      <ui-button
        label="Create your own"
        variant="secondary"
        @click="appStore.navigateTo(Page.CREATE_PUZZLE_SELECT_TOPIC)"
      >
        <template #icon>
          <i-noto-plus />
        </template>
      </ui-button>
    </ui-buttons-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, nextTick, onMounted } from "vue";

import { Page, useAppStore } from "../stores/app";

import { animatePop } from "../utils/animate";
import { useMessageListener } from "../composables/useMessageListener";
import { sendMessage } from "../utils/messages";
import { PuzzleSummaryResponse } from "../../shared/types/message";

const appStore = useAppStore();
const { puzzle, puzzleSummary } = storeToRefs(appStore);

const topic = computed(() => {
  return puzzle.value?.topic;
});

useMessageListener<PuzzleSummaryResponse>("PUZZLE_SUMMARY_RESPONSE", (message) => {
  puzzleSummary.value = message.data.puzzleSummary;
  appStore.stopLoadingOverlay("PUZZLE_SUMMARY_REQUEST");

  nextTick(() => {
    animatePop(".pop-in", "in", true);
  });
});

onMounted(() => {
  if (!puzzleSummary.value) {
    appStore.startLoadingOverlay("PUZZLE_SUMMARY_REQUEST");

    sendMessage({
      type: "PUZZLE_SUMMARY_REQUEST",
    });
  } else {
    animatePop(".pop-in", "in", true);
  }
});
</script>
