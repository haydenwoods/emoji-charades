<template>
  <div class="relative size-full flex flex-col items-center justify-between">
    <div id="header" class="flex flex-col gap-y-0.5 items-center">
      <h1 class="text-2xl font-medium text-center">What do these emojis represent?</h1>
      <h2 class="text-slate-500 text-center">Clue created by u/Spleentacular</h2>
    </div>

    <ui-emojis v-if="puzzle?.clue" :emojis="puzzle.clue" />

    <div id="tools" class="flex items-center gap-x-2 max-w-xl">
      <ui-input
        id="input"
        v-model="input"
        placeholder="Guess..."
        autofocus
        @keydown.enter="onKeydownEnter"
      >
        <template #after>
          <button
            id="submit-button"
            type="button"
            class="not-disabled:cursor-pointer p-1 flex items-center justify-center transition-colors"
            :class="input.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            @click="input = ''"
          >
            <i-material-symbols-cancel-outline-rounded
              class="text-xl text-slate-600 in-disabled:text-slate-400"
            />
          </button>
        </template>
      </ui-input>

      <ui-button id="submit" label="Submit" @click="submit" />
    </div>

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
  animatePop("#header");
  animatePop("#tools");
});
</script>
