<template>
  <div class="size-full flex flex-col gap-y-4 items-center justify-center">
    <div class="flex flex-col items-center gap-y-5 my-auto">
      <div class="flex items-center gap-x-3">
        <h2 class="text-xl text-neutral-800 font-medium">Your topic is a</h2>
        <span
          class="rounded-full px-3 py-1.5 bg-purple-300 text-purple-950 inline-flex items-center gap-x-2"
        >
          <span class="text-xl">🎬</span>
          <span class="text-lg font-medium">Movie</span>
        </span>
      </div>
      <h1 class="text-5xl text-neutral-950 font-semibold text-center">
        <!-- "There Will be Blood" -->
        {{ user?.username }}
      </h1>
    </div>

    <div class="flex items-center gap-x-4">
      <button
        type="button"
        class="flex items-center gap-x-2 rounded-full shadow-md ring ring-neutral-700 py-2 px-4"
      >
        <span class="text-xl">🎲</span>
        <span class="text-lg text-neutral-700 font-medium">New Topic</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-x-2 rounded-full shadow-md inset-shadow-sm inset-shadow-white/10 ring ring-blue-400 inset-ring inset-ring-white/10 py-2 px-4 bg-blue-300"
      >
        <span class="text-xl">🎉</span>
        <span class="text-lg text-blue-950 font-medium">Let's Start!</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const { user } = storeToRefs(appStore);
</script>
