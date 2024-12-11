<template>
  <div class="size-full flex flex-col items-center">
    <div class="flex flex-col items-center gap-y-1">
      <div class="flex items-center gap-x-1.5">
        <h2 class="text-neutral-800 font-medium">The topic was a</h2>
        <ui-topic-category-tag :category="topic.category" />
      </div>
      <h1 class="text-2xl text-neutral-950 font-semibold text-center">"{{ topic.name }}"</h1>

      <ui-emojis size="xs" :emojis="dbPost.clue" />
    </div>

    <div class="flex items-center mt-auto gap-x-2">
      <ui-button label="Play another!" @click="appStore.navigateTo(Page.PLAY)">
        <template #icon>
          <i-noto-play-button />
        </template>
      </ui-button>

      <ui-button
        label="Create your own"
        variant="secondary"
        @click="appStore.navigateTo(Page.CREATE_SELECT_TOPIC)"
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
import { computed } from "vue";

import { Page, useAppStore } from "../../stores/app";

const appStore = useAppStore();
const { dbPost } = storeToRefs(appStore);

const topic = computed(() => {
  return dbPost.value.topic;
});
</script>
