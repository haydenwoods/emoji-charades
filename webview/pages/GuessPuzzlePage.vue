<template>
  <div class="relative size-full flex flex-col items-center justify-between">
    <ui-page-header class="pop-in">
      <template #left>
        <ui-button size="xs" variant="plain" @click="appStore.navigateTo(Page.ABOUT)">
          <template #icon>
            <i-material-symbols-help-outline-rounded class="text-2xl" />
          </template>
        </ui-button>
      </template>

      <template #title>
        <div class="flex flex-col gap-y-0.5 items-center">
          <h1 class="text-2xl font-medium text-center">What do these emojis represent?</h1>
          <h2 class="text-slate-500 text-center">Clue created by u/Spleentacular</h2>
        </div>
      </template>
    </ui-page-header>

    <ui-emojis v-if="puzzle?.clue" :emojis="puzzle.clue" />

    <ui-buttons-row id="tools" class="pop-in max-w-2xl">
      <ui-input
        v-model="input"
        placeholder="Guess..."
        autofocus
        show-clear
        @keydown.enter="onKeydownEnter"
      />

      <ui-button id="submit-button" label="Submit" @click="submit" />
    </ui-buttons-row>

    <ui-overlay theme="success" label="Correct" :open="showCorrectOverlay">
      <template #icon>
        <i-material-symbols-check-circle-outline-rounded />
      </template>
    </ui-overlay>

    <ui-overlay theme="error" label="Incorrect" :open="showIncorrectOverlay">
      <template #icon>
        <i-material-symbols-cancel-outline-rounded />
      </template>
    </ui-overlay>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { Page, useAppStore } from "../stores/app";

import { isGuessCorrect } from "../../shared/utils/topics";
import { animatePop, animateShake } from "../utils/animate";
import { sendMessage } from "../utils/messages";

const appStore = useAppStore();
const { puzzle } = storeToRefs(appStore);

const input = ref<string>("");
const showCorrectOverlay = ref<boolean>(false);
const showIncorrectOverlay = ref<boolean>(false);

const submit = () => {
  const trimmedInput = input.value.trim();
  if (trimmedInput.length <= 0) return;

  if (!puzzle.value) return;
  const { topic } = puzzle.value;

  const correct = isGuessCorrect(trimmedInput, topic);

  sendMessage({
    type: "GUESS_PUZZLE_REQUEST",
    data: {
      input: trimmedInput,
    },
  });

  if (correct) {
    showCorrectOverlay.value = true;

    setTimeout(() => {
      appStore.navigateTo(Page.PUZZLE_SUMMARY);
    }, 2000);
  } else {
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
  animatePop(".pop-in", "in", true);
});
</script>
