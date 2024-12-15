<template>
  <div class="size-full flex flex-col gap-y-6 items-center">
    <div class="pop-in flex flex-col items-center gap-y-1">
      <div class="flex items-center gap-x-1.5">
        <h2 class="text-slate-800 font-medium">The topic was a</h2>
        <ui-topic-category-tag :category="topic.category" />
      </div>
      <h1 class="text-2xl text-slate-950 font-semibold text-center">"{{ topic.name }}"</h1>
    </div>

    <div v-if="puzzleGuesses?.length" class="flex flex-col gap-y-4 w-full my-auto">
      <div
        v-for="puzzleGuess in puzzleGuesses"
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

    <div class="pop-in flex items-center mt-auto gap-x-2">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

import { Page, useAppStore } from "../stores/app";

import { animatePop } from "../utils/animate";

const appStore = useAppStore();
const { puzzle, puzzleGuesses } = storeToRefs(appStore);

const topic = computed(() => {
  return puzzle.value.topic;
});

onMounted(() => {
  animatePop(".pop-in", "in", true);
});
</script>
