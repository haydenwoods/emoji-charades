<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="What is this?" @click:back="appStore.navigateTo(appStore.mainPage)">
      <template #title:icon>
        <i-noto-red-question-mark />
      </template>
    </ui-page-header>

    <div
      class="flex flex-col gap-y-5 items-center text-center text-slate-900 my-auto max-w-xl text-xl"
    >
      <p>
        You will be shown a clue made from emojis. Your goal is to try and
        <span class="font-medium">work out what they represent.</span>
      </p>

      <div class="flex flex-col gap-y-3">
        <ui-emojis :emojis="['🎬', '🕖', '💼', '🍊']" size="sm" :animate="false" />
        <span class="text-slate-600 text-base">For example: "A Clockwork Orange"</span>
      </div>

      <p>It could be anything from categories such as:</p>

      <div class="flex flex-wrap gap-2">
        <ui-topic-category-tag
          v-for="category in EXAMPLE_CATEGORIES"
          :key="category"
          size="lg"
          :category="category"
        />
      </div>

      <p>Earn XP by guessing correctly or having one of your clues solved by another player.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "../stores/app";

import { Category } from "../../shared/types/category";

const EXAMPLE_CATEGORIES: Category[] = [Category.MOVIE, Category.TV_SHOW, Category.PHRASE];

const appStore = useAppStore();
</script>
