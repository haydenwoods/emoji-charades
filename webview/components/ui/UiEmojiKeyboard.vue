<template>
  <div
    class="grid w-full max-w-4xl gap-2 sm:gap-3"
    :style="{
      gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
      gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
    }"
  >
    <!-- Search -->
    <ui-input
      v-model="search"
      class="h-[52px] col-span-5 sm:col-span-4 row-start-1 col-start-1 self-end"
      placeholder="Search emojis..."
      maxlength="16"
      autofocus
      show-clear
    />

    <!-- Backspace -->
    <ui-button
      variant="secondary"
      class="self-end h-[52px] row-start-1 col-start-6"
      @click="emit('click:backspace')"
    >
      <template #icon>
        <i-material-symbols-backspace-outline-rounded />
      </template>
    </ui-button>

    <!-- Submit -->
    <ui-button
      label="Submit"
      variant="primary"
      class="self-end h-[52px] row-start-1 col-start-7 col-span-2"
      @click="emit('click:submit')"
    />

    <!-- Keys -->
    <div
      v-for="(_, i) in KEYS"
      :key="i"
      :style="{
        gridRow: Math.ceil((i + 1) / KEYS_PER_ROW) + (KEYS_ROW_START - 1),
      }"
      class="aspect-square flex items-center justify-center"
    >
      <ui-emoji-keyboard-button
        v-if="keys[i]"
        :emoji="keys[i]"
        variant="key"
        @click="emit('click:key', keys[i])"
      />

      <div
        v-else
        class="size-full scale-95 bg-white inset-ring-2 inset-ring-slate-200 opacity-40 rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useFuse } from "@vueuse/integrations/useFuse";

import { EMOJIS } from "../../constants/emojis";

import { Emoji } from "../../types/emoji";

const ROWS = 2;
const COLS = 8;

const KEYS_ROW_START = 2;
const KEYS_ROW_END = 2;
const KEYS_COL_START = 1;
const KEYS_COL_END = 8;
const KEYS_ROWS = KEYS_ROW_END - KEYS_ROW_START + 1;
const KEYS_COLS = KEYS_COL_END - KEYS_COL_START + 1;

const KEYS = KEYS_ROWS * KEYS_COLS;
const KEYS_PER_ROW = KEYS / KEYS_ROWS;

const emit = defineEmits<{
  (event: "click:key", emoji: Emoji): void;
  (event: "click:backspace"): void;
  (event: "click:submit"): void;
}>();

const search = ref<string>("");

const isSearching = computed(() => {
  return search.value.trim().length > 0;
});

const { results } = useFuse(search, EMOJIS, {
  resultLimit: KEYS,
  fuseOptions: {
    keys: ["searchTerms"],
    minMatchCharLength: 2,
    threshold: 0.2,
  },
});

const keys = computed<Emoji[]>(() => {
  if (isSearching.value) {
    return results.value.map(({ item }) => item);
  } else {
    return EMOJIS.slice(0, KEYS);
  }
});
</script>
