<template>
  <div class="size-full flex flex-col items-center justify-center">
    <div class="flex flex-col gap-y-1 items-center">
      <h1 class="text-xl text-center">
        Your topic is <span class="font-semibold">"{{ topic.name }}"</span>
      </h1>
      <h2 class="text-neutral-500 text-sm text-center max-w-md">
        Click on the emojis below to start typing out your sentence. If you can't see one that fits,
        try searching for it instead.
      </h2>
    </div>

    <div class="flex items-center gap-4 flex-wrap justify-center my-auto">
      <span v-for="(emoji, i) in emojis" :key="i" class="text-6xl">
        {{ emoji.value }}
      </span>
    </div>

    <ui-emoji-keyboard
      @click:key="onClickKey"
      @click:backspace="onClickBackspace"
      @click:submit="onClickSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore } from "../../stores/create";

import { sendMessage } from "../../utils/messages";

import { Emoji } from "../../types/emoji";

const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const emojis = ref<Emoji[]>([]);

const onClickKey = (emoji: Emoji) => {
  emojis.value.push(emoji);
};

const onClickBackspace = () => {
  emojis.value.pop();
};

const onClickSubmit = () => {
  const sentence: string = emojis.value.map(({ value }) => value).join("");
  sendMessage({
    type: "CREATE_REQUEST",
    data: {
      topic: { ...topic.value },
      sentence,
    },
  });
};
</script>
