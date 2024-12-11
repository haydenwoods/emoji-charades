<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="What is this?" @click:back="appStore.navigateTo(Page.MENU)" />

    <div
      class="flex flex-col gap-y-6 items-center text-center text-neutral-900 my-auto max-w-xl text-2xl"
    >
      <p>
        You will be shown a clue made from emojis. Your goal is to try and
        <span class="font-medium">work out what it means</span>. It could be anything from
        categories such as:
      </p>

      <div class="flex flex-wrap gap-3">
        <ui-topic-category-tag size="lg" :category="Category.MOVIE" />
        <ui-topic-category-tag size="lg" :category="Category.TV_SHOW" />
        <ui-topic-category-tag size="lg" :category="Category.VIDEO_GAME" />
      </div>

      <p>Earn points by guessing correctly or having one of your clues solved by another player.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category } from "../../shared/types/category";
import { Page, useAppStore } from "../stores/app";

const appStore = useAppStore();
</script>
