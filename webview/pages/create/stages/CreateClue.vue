<template>
  <div class="size-full flex flex-col items-center">
    <h1 class="text-xl text-neutral-800 font-medium">
      Your topic is <span class="font-semibold">"{{ topic.name }}"</span>
    </h1>
    <h2 class="text-neutral-500">Create a clue for this, using only emojis!</h2>

    <ui-emojis :emojis="clue" sortable class="my-auto" />

    <ui-emoji-keyboard
      :submit-disabled="!canSubmit"
      @click:key="onClickKey"
      @click:backspace="onClickBackspace"
      @click:submit="onClickSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRaw } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore } from "../../../stores/create";

import { sendMessage } from "../../../utils/messages";

import { Emoji } from "../../../types/emoji";

const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const clue = ref<string[]>([]);

const canSubmit = computed(() => {
  return clue.value.length > 0;
});

const onClickKey = (emoji: Emoji) => {
  clue.value.push(emoji.value);
};

const onClickBackspace = () => {
  clue.value.pop();
};

const onClickSubmit = () => {
  if (!canSubmit.value) return;

  sendMessage({
    type: "CREATE_REQUEST",
    data: {
      topic: toRaw(topic.value),
      clue: toRaw(clue.value),
    },
  });
};
</script>
