<template>
  <div class="size-full flex flex-col items-center">
    <ui-page-header @click:back="appStore.navigateTo(appStore.mainPage)">
      <template #title>
        <ui-topic-title :topic="topic" />
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

import { useAppStore } from "../../stores/app";
import { useNotificationStore } from "../../stores/notification";
import { useCreateStore } from "../../stores/create";

import { sendMessage } from "../../utils/messages";

import { Emoji } from "../../types/emoji";

const MAX_CLUE_LENGTH: number = 14;

const appStore = useAppStore();
const notificationStore = useNotificationStore();
const createStore = useCreateStore();

const { topic } = storeToRefs(createStore);

const clue = ref<string[]>([]);

const onClickKey = (emoji: Emoji) => {
  if (clue.value.length >= MAX_CLUE_LENGTH) return;
  clue.value.push(emoji.value);
};

const onClickBackspace = () => {
  clue.value.pop();
};

const onClickSubmit = () => {
  if (clue.value.length <= 0) return;

  notificationStore.showLoading("CREATE_REQUEST", "Creating");

  sendMessage({
    type: "CREATE_REQUEST",
    data: {
      topic: toRaw(topic.value),
      clue: toRaw(clue.value),
    },
  });
};
</script>
