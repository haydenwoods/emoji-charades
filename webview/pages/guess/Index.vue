<template>
  <div class="size-full flex flex-col items-center justify-center">
    <ui-emojis :emojis="emojis" />

    <div class="flex items-center gap-x-4 max-w-xl">
      <ui-input
        id="input"
        placeholder="Guess..."
        autofocus
        v-model="guess"
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
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { emojiPattern } from "regex-combined-emojis";
import { stringSimilarity } from "string-similarity-js";
import { animate } from "motion";

import { useGuessStore } from "../../stores/guess";

import { sendMessage } from "../../utils/messages";

const guessStore = useGuessStore();
const { postData } = storeToRefs(guessStore);

const guess = ref<string>("");

const emojis = computed<string[]>(() => {
  if (!postData.value?.sentence) return [];
  const regex = new RegExp(emojiPattern, "g");
  const matches = postData.value.sentence.matchAll(regex);
  const emojis = Array.from(matches).flat();
  return emojis;
});

const submitGuess = () => {
  if (!postData.value) return;

  const { topic } = postData.value;

  const trimmedGuess = guess.value.trim();
  if (trimmedGuess.length <= 0) return;

  const topicNames = [topic.name, ...(topic.alternateNames ?? [])];
  const topicNameSimilarities = topicNames.map((name) => stringSimilarity(trimmedGuess, name));
  const highestSimilarity = Math.max(...topicNameSimilarities);

  if (highestSimilarity > 0.9) {
    // Correct
  } else {
    animate("#input", {
      x: [0, 6, -6, 6, -6, 6, -6, 0],
    });
  }

  sendMessage({
    type: "GUESS_REQUEST",
    data: {
      guess: trimmedGuess,
    },
  });
};

const onKeydownEnter = (event: Event) => {
  event.preventDefault();
  submitGuess();
};
</script>
