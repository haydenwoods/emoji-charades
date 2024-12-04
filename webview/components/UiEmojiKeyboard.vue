<template>
  <div
    class="grid w-full gap-3"
    :style="{
      gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
      gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
    }"
  >
    <!-- Search -->
    <div class="col-start-4 col-span-3 row-start-1 self-end bg-white rounded-full h-2/3">
      <input
        type="text"
        v-model="search"
        class="h-full w-full rounded-full py-1 px-4 font-medium"
        placeholder="Search"
      />
    </div>

    <!-- Keys -->
    <ui-emoji-keyboard-button
      v-for="(emoji, i) in emojis"
      :key="i"
      :emoji="emoji"
      variant="key"
      :style="{
        gridRow: Math.ceil((i + 1) / KEYS_PER_ROW) + (KEYS_ROW_START - 1),
      }"
      @click="emit('click:key', emoji)"
    />

    <!-- Actions -->
    <ui-emoji-keyboard-button
      variant="action"
      :style="{ gridRow: ACTION_ROW_START, gridColumn: ACTION_COLUMN_START }"
    >
      <i-material-symbols-arrow-upward-rounded class="text-2xl text-blue-950" />
    </ui-emoji-keyboard-button>

    <ui-emoji-keyboard-button
      variant="action"
      :style="{ gridRow: ACTION_ROW_START + 1, gridColumn: ACTION_COLUMN_START }"
      @click="emit('click:backspace')"
    >
      <i-material-symbols-backspace-outline-rounded class="text-2xl text-blue-950" />
    </ui-emoji-keyboard-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useFuse } from "@vueuse/integrations/useFuse";

import { EMOJIS } from "../constants/emojis";

import { Emoji } from "../types/emoji";

const ROWS = 3;
const COLS = 9;

const KEYS_ROW_START = 2;
const KEYS_ROW_END = 3;
const KEYS_COL_START = 1;
const KEYS_COL_END = 8;
const KEYS_ROWS = KEYS_ROW_END - KEYS_ROW_START + 1;
const KEYS_COLS = KEYS_COL_END - KEYS_COL_START + 1;

const KEYS = KEYS_ROWS * KEYS_COLS;
const KEYS_PER_ROW = KEYS / KEYS_ROWS;

const ACTION_ROW_START = 2;
const ACTION_COLUMN_START = 9;

const emit = defineEmits<{
  (event: "click:key", emoji: Emoji): void;
  (event: "click:backspace"): void;
}>();

const search = ref<string>("");

const isSearching = computed(() => {
  return search.value.trim().length > 0;
});

const { results } = useFuse(search, EMOJIS, {
  resultLimit: KEYS,
  fuseOptions: {
    keys: ["searchTerms"],
  },
});

const emojis = computed<Emoji[]>(() => {
  if (isSearching.value) {
    return results.value.map(({ item }) => item);
  } else {
    return EMOJIS.slice(0, KEYS);
  }
});
</script>
