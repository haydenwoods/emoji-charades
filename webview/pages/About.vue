<template>
  <div class="size-full flex flex-col items-center">
    <div class="w-full flex items-center">
      <ui-button
        size="sm"
        variant="plain"
        label="Back"
        :padded="false"
        @click="appStore.navigateTo(Page.MENU)"
      >
        <template #icon>
          <i-material-symbols-arrow-back-rounded />
        </template>
      </ui-button>
    </div>

    <div
      class="flex flex-col gap-y-6 items-center text-center text-neutral-900 my-auto max-w-lg text-xl"
    >
      <p class="font-medium">
        Your aim is to figure out what the clue made from emojis represents.
      </p>

      <p>
        The topics can be from categories such as Movies, TV Shows, Books, etc (mostly pop-culture).
      </p>

      <div class="flex flex-col gap-y-2">
        <p>For example:</p>
        <ui-emojis size="sm" :emojis="['1️⃣', '2️⃣', '😡', '👨‍💼', '💼', '🎬']"></ui-emojis>
        <p>Would be <span class="font-medium">"12 Angry Men"</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Page, useAppStore } from "../stores/app";

const appStore = useAppStore();
</script>
