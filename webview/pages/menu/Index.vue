<template>
  <div class="size-full flex items-center justify-center">
    <div class="flex flex-col items-center gap-y-8">
      <div id="title" class="flex flex-col gap-y-2 items-center">
        <h1 class="text-5xl font-semibold text-center text-neutral-900">Emoji Game</h1>
        <h2 class="text-xl text-center text-neutral-800">
          Reddit <i-noto-red-heart class="inline pb-[4px]" /> emojis... right?
        </h2>
      </div>

      <div id="buttons" class="grid grid-cols-2 max-w-2xs w-full gap-3">
        <button
          id="play-button"
          type="button"
          class="size-full bg-amber-300 border-2 border-amber-400 inset-shadow-sm inset-shadow-amber-400/40 p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-amber-950 not-disabled:cursor-pointer hover:scale-103 transition-transform active:scale-97"
        >
          <i-noto-play-button class="text-5xl" />
          <span class="text-xl font-medium text-amber-900">Play</span>
        </button>

        <button
          type="button"
          class="size-full bg-neutral-200 border-2 border-neutral-300 p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-neutral-900 not-disabled:cursor-pointer hover:scale-103 transition-transform active:scale-97"
          @click="appStore.navigateTo(Page.CREATE_SELECT_TOPIC)"
        >
          <i-noto-plus class="text-5xl" />
          <span class="text-xl font-medium text-neutral-900">Create</span>
        </button>

        <button
          type="button"
          class="size-full bg-neutral-200 border-2 border-neutral-300 p-2 rounded-xl flex gap-x-2 items-center justify-center text-neutral-900 not-disabled:cursor-pointer hover:scale-103 transition-transform col-span-2 active:scale-97"
          @click="appStore.navigateTo(Page.LEADERBOARD)"
        >
          <i-noto-trophy class="text-2xl" />
          <span class="text-xl font-medium text-neutral-900">Leaderboard</span>
        </button>

        <button
          type="button"
          class="size-full bg-neutral-200 border-2 border-neutral-300 p-2 rounded-xl flex gap-x-2 items-center justify-center text-neutral-900 not-disabled:cursor-pointer hover:scale-103 transition-transform col-span-2 active:scale-97"
          @click="appStore.navigateTo(Page.ABOUT)"
        >
          <i-noto-question-mark class="text-2xl" />
          <span class="text-xl font-medium text-neutral-900">What is this?</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { animatePopIn } from "../../utils/animate";

import { Page, useAppStore } from "../../stores/app";

const appStore = useAppStore();

onMounted(() => {
  animatePopIn("#title");
  animatePopIn("#buttons");
});
</script>
