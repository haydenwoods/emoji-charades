<template>
  <div class="size-full flex flex-col items-center justify-center gap-y-8">
    <div class="flex flex-col gap-y-2 items-center">
      <h1 class="text-5xl font-semibold text-center text-neutral-900">Emoji Game</h1>
      <h2 class="text-xl text-center text-neutral-600">Reddit loves emojis... right?</h2>
    </div>

    <div class="grid grid-cols-2 max-w-2xs w-full gap-4">
      <button
        type="button"
        class="size-full bg-amber-300 border-2 border-amber-400 p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-amber-950 not-disabled:cursor-pointer hover:scale-102 transition-transform"
      >
        <i-noto-play-button class="text-5xl" />
        <span class="text-xl font-medium">Play</span>
      </button>

      <button
        type="button"
        class="size-full bg-neutral-200 border-2 border-neutral-300 p-4 aspect-square rounded-xl flex flex-col gap-y-2 items-center justify-center text-neutral-900 not-disabled:cursor-pointer hover:scale-102 transition-transform"
        @click="onCreateClicked"
      >
        <i-noto-plus class="text-5xl" />
        <span class="text-xl font-medium">Create</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Page, useAppStore } from "../../stores/app";

const appStore = useAppStore();

const onCreateClicked = () => {
  appStore.navigateTo(Page.CREATE);
};
</script>
