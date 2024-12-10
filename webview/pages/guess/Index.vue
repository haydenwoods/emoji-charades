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
              class="text-xl text-neutral-600 in-disabled:text-neutral-400"
            />
          </button>
        </template>
      </ui-input>
      <ui-button id="submit" label="Submit" @click="submit">
        <template #icon>
          <i-noto-outbox-tray />
        </template>
      </ui-button>
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
