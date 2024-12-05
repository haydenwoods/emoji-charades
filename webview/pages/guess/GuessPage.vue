<template>
  <div class="size-full flex flex-col items-center justify-center">
    <div class="flex items-center gap-4 flex-wrap justify-center my-auto">
      <span v-for="(emoji, i) in emojis" :key="i" class="text-6xl">
        {{ emoji }}
      </span>
    </div>

    <div class="flex items-center gap-x-4 max-w-xl">
      <ui-input placeholder="Guess..." autofocus v-model="guess">
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

import { useGuessStore } from "../../stores/guess";

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
</script>
