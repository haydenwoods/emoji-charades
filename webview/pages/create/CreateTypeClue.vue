<template>
  <div class="size-full flex flex-col items-center">
    <ui-page-header @click:back="appStore.navigateTo(Page.MENU)">
      <template #title>
        <div class="flex flex-col items-center gap-y-1">
          <div class="flex items-center gap-x-1.5">
            <h2 class="text-neutral-800 font-medium">Your topic is a</h2>
            <ui-topic-category-tag :category="topic.category" />
          </div>
          <h1 class="text-2xl text-neutral-950 font-semibold text-center">"{{ topic.name }}"</h1>
        </div>
      </template>
    </ui-page-header>

    <ui-emojis v-model:emojis="clue" edit class="my-auto" />

    <ui-emoji-keyboard
      @click:key="onClickKey"
      @click:backspace="onClickBackspace"
      @click:submit="onClickSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { storeToRefs } from "pinia";

import { Page, useAppStore } from "../../stores/app";
import { useCreateStore } from "../../stores/create";

import { sendMessage } from "../../utils/messages";

import { Emoji } from "../../types/emoji";

const appStore = useAppStore();
const createStore = useCreateStore();

const { topic } = storeToRefs(createStore);

const clue = ref<string[]>([]);

const onClickKey = (emoji: Emoji) => {
  clue.value.push(emoji.value);
};

const onClickBackspace = () => {
  clue.value.pop();
};

const onClickSubmit = () => {
  if (clue.value.length <= 0) return;

  appStore.startLoadingOverlay({
    id: "CREATE_REQUEST",
    label: "Creating",
  });

  sendMessage({
    type: "CREATE_REQUEST",
    data: {
      topic: toRaw(topic.value),
      clue: toRaw(clue.value),
    },
  });
};
</script>
