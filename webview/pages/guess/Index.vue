<template>
  <div class="relative size-full flex flex-col items-center justify-between">
    <h1 id="title" class="text-xl font-medium text-center">What do these emojis represent?</h1>

    <ui-emojis v-if="dbPost?.clue" :emojis="dbPost.clue" />

    <div id="tools" class="flex items-center gap-x-2 max-w-xl">
      <ui-input
        id="input"
        placeholder="Guess..."
        autofocus
        v-model="input"
        @keydown.enter="onKeydownEnter"
      />
      <ui-button id="submit" label="Submit" emoji="🔥" @click="submit" />
    </div>

    <ui-overlay theme="success" label="Correct" :open="showCorrectOverlay">
      <template #icon>
        <i-material-symbols-cancel-rounded />
      </template>
    </ui-overlay>

    <ui-overlay theme="error" label="Incorrect" :open="showIncorrectOverlay">
      <template #icon>
        <i-material-symbols-cancel-rounded />
      </template>
    </ui-overlay>

    <!-- Notifications -->
    <!-- <div
      id="incorrect-notification"
      class="flex items-center gap-1.5 bg-red-100 border-2 border-red-700 rounded-full py-2.5 px-3.5 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 -z-10"
    >
    <i-material-symbols-cancel-rounded class="text-red-700" />
      <span class="font-medium leading-none text-red-800"> Incorrect </span>
    </div>

    <div
      id="correct-notification"
      class="flex items-center gap-1.5 bg-green-100 border-2 border-green-700 rounded-full py-2.5 px-3.5 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 -z-10"
    >
      <i-material-symbols-check-circle-rounded class="text-green-700" />
      <span class="font-medium leading-none text-green-800"> Correct </span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { animate } from "motion";

import { Page, useAppStore } from "../../stores/app";
import { useGuessStore } from "../../stores/guess";

import { animatePopIn, animateShake } from "../../utils/animate";

const appStore = useAppStore();
const guessStore = useGuessStore();

const { dbPost } = storeToRefs(guessStore);

const input = ref<string>("");
const showCorrectOverlay = ref<boolean>(false);
const showIncorrectOverlay = ref<boolean>(false);

const submit = () => {
  const response = guessStore.submit(input.value);

  if (response?.correct) {
    showCorrectOverlay.value = true;

    setTimeout(() => {
      appStore.navigateTo(Page.SUMMARY);
    }, 2000);
  } else if (response?.correct === false) {
    animateShake("#tools");

    showIncorrectOverlay.value = true;
    setTimeout(() => {
      showIncorrectOverlay.value = false;
    }, 1000);
  }

  input.value = "";
};

const onKeydownEnter = (event: KeyboardEvent) => {
  if (event.repeat) return;
  event.preventDefault();
  submit();
};

onMounted(() => {
  animatePopIn("#tools");
  animatePopIn("#title");
});
</script>
