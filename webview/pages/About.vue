<template>
  <div class="size-full flex flex-col items-center gap-y-6">
    <ui-page-header title="What is this?" @click:back="appStore.navigateTo(Page.MENU)" />

    <div class="flex flex-col items-center text-center text-neutral-900 my-auto max-w-lg text-xl">
      <p class="font-medium">
        Your aim is to figure out what the clue made from emojis represents.
      </p>

      <p>The topics can be from categories such as:</p>
      <div class="flex flex-wrap gap-1">
        <ui-topic-category-tag size="lg" :category="Category.MOVIE" />
        <ui-topic-category-tag size="lg" :category="Category.TV_SHOW" />
        <ui-topic-category-tag size="lg" :category="Category.VIDEO_GAME" />
      </div>

      <div class="flex flex-col gap-y-2">
        <p>For example:</p>
        <ui-emojis size="sm" :emojis="['1️⃣', '2️⃣', '😡', '👨‍💼', '💼', '🎬']"></ui-emojis>
        <p>Would be <span class="font-medium">"12 Angry Men"</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category } from "../../shared/types/category";
import { Page, useAppStore } from "../stores/app";

const appStore = useAppStore();
</script>
