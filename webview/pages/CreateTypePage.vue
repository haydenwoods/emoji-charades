<template>
  <div class="size-full flex flex-col items-center justify-center">
    <h1 class="text-lg">
      Your topic is: <span class="font-semibold">{{ topic.name }}</span>
    </h1>

    <div class="flex items-center gap-4 flex-wrap justify-center my-auto">
      <span v-for="(emoji, i) in emojis" :key="i" class="text-5xl">
        {{ emoji.value }}
      </span>
    </div>

    <ui-emoji-keyboard @click:key="onClickKey" @click:backspace="onClickBackspace" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore } from "../stores/create";

import { Emoji } from "../types/emoji";

const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const emojis = ref<Emoji[]>([]);

const onClickKey = (emoji: Emoji) => {
  emojis.value.push(emoji);
};

const onClickBackspace = () => {
  emojis.value.pop();
};
</script>
