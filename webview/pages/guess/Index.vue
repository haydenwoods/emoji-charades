<template>
  <div class="size-full flex flex-col items-center justify-center">
    <ui-emojis :emojis="dbPost?.emojis" />

    <div class="flex items-center gap-x-4 max-w-xl">
      <ui-input
        id="input"
        placeholder="Guess..."
        autofocus
        v-model="input"
        @keydown.enter="onKeydownEnter"
      >
        <template #after>
          <button
            type="button"
            class="size-8 rounded-full bg-blue-300 not-disabled:cursor-pointer flex items-center justify-center text-blue-900"
          >
            <i-material-symbols-arrow-upward-rounded />
          </button>
        </template>
      </ui-input>

      <ui-button label="Hint" emoji="💡" variant="secondary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { stringSimilarity } from "string-similarity-js";
import { animate } from "motion";

import { Page, useAppStore } from "../../stores/app";
import { useGuessStore } from "../../stores/guess";

import { sendMessage } from "../../utils/messages";

const appStore = useAppStore();
const guessStore = useGuessStore();
const { dbPost } = storeToRefs(guessStore);

const input = ref<string>("");

const submitGuess = () => {
  if (!dbPost.value) return;

  const { topic } = dbPost.value;

  const trimmedInput = input.value.trim();
  if (trimmedInput.length <= 0) return;

  const topicNames = [topic.name, ...(topic.alternateNames ?? [])];
  const topicNameSimilarities = topicNames.map((name) => stringSimilarity(trimmedInput, name));
  const highestSimilarity = Math.max(...topicNameSimilarities);

  if (highestSimilarity > 0.9) {
    appStore.navigateTo(Page.SUMMARY);
  } else {
    animate("#input", {
      x: [0, 6, -6, 6, -6, 6, -6, 0],
    });
  }

  sendMessage({
    type: "GUESS_REQUEST",
    data: {
      input: trimmedInput,
    },
  });
};

const onKeydownEnter = (event: Event) => {
  event.preventDefault();
  submitGuess();
};
</script>
