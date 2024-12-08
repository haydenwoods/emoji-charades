<template>
  <ui-emojis :emojis="emojis" />
  <ui-emoji-keyboard
    :submit-disabled="!canSubmit"
    @click:key="onClickKey"
    @click:backspace="onClickBackspace"
    @click:submit="onClickSubmit"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useCreateStore } from "../../../stores/create";

import { sendMessage } from "../../../utils/messages";

import { Emoji } from "../../../types/emoji";

const createStore = useCreateStore();
const { topic } = storeToRefs(createStore);

const emojis = ref<string[]>([]);

const canSubmit = computed(() => {
  return emojis.value.length > 0;
});

const onClickKey = (emoji: Emoji) => {
  emojis.value.push(emoji.value);
};

const onClickBackspace = () => {
  emojis.value.pop();
};

const onClickSubmit = () => {
  if (!canSubmit.value) return;

  sendMessage({
    type: "CREATE_REQUEST",
    data: {
      topic: { ...topic.value },
      emojis: emojis.value,
    },
  });
};
</script>
