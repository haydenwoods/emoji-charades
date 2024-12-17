<template>
  <div class="size-full flex items-center justify-center">
    <div class="flex flex-col items-center gap-y-8">
      <div class="pop-in flex flex-col gap-y-2 items-center">
        <h1 class="text-4xl sm:text-5xl font-semibold text-center text-slate-900">
          Emoji Charades
        </h1>
        <h2 class="text-lg sm:text-xl text-center text-slate-800">Reddit loves emojis... right?</h2>
      </div>

      <div class="pop-in grid grid-cols-2 max-w-2xs w-full gap-3 sm:gap-4">
        <button
          type="button"
          class="size-full bg-amber-300 border-2 border-amber-400 inset-shadow-sm inset-shadow-amber-400/40 p-3 sm:p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-amber-950 not-disabled:cursor-pointer hover:scale-103 transition-transform active:scale-97"
          @click="appStore.navigateTo(Page.PLAY)"
        >
          <i-noto-play-button class="text-4xl sm:text-5xl" />
          <span class="text-lg sm:text-xl font-medium text-amber-900">Play</span>
        </button>

        <button
          type="button"
          class="size-full bg-slate-200 border-2 border-slate-300 p-3 sm:p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-slate-800 not-disabled:cursor-pointer hover:scale-103 transition-transform active:scale-97"
          @click="appStore.navigateTo(Page.CREATE_PUZZLE_SELECT_TOPIC)"
        >
          <i-noto-plus class="text-4xl sm:text-5xl" />
          <span class="text-lg sm:text-xl font-medium text-slate-900">Create</span>
        </button>

        <button
          type="button"
          class="size-full bg-slate-200 border-2 border-slate-300 p-1.5 sm:p-2 rounded-xl flex gap-x-2 items-center justify-center text-slate-800 not-disabled:cursor-pointer hover:scale-103 transition-transform col-span-2 active:scale-97"
          @click="appStore.navigateTo(Page.LEADERBOARD)"
        >
          <i-noto-trophy class="text-xl sm:text-2xl" />
          <span class="text-lg sm:text-xl font-medium text-slate-900">Leaderboard</span>
        </button>

        <button
          type="button"
          class="size-full bg-slate-200 border-2 border-slate-300 p-1.5 sm:p-2 rounded-xl flex gap-x-2 items-center justify-center text-slate-800 not-disabled:cursor-pointer hover:scale-103 transition-transform col-span-2 active:scale-97"
          @click="appStore.navigateTo(Page.ABOUT)"
        >
          <i-noto-question-mark class="text-xl sm:text-2xl" />
          <span class="text-lg sm:text-xl font-medium text-slate-900">What is this?</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { animatePop } from "../utils/animate";

import { Page, useAppStore } from "../stores/app";

const appStore = useAppStore();

onMounted(() => {
  animatePop(".pop-in", "in", true);
});
</script>
