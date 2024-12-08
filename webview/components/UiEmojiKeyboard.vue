<template>
  <div
    class="grid w-full max-w-4xl gap-2 md:gap-3"
    :style="{
      gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
      gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
    }"
  >
    <!-- Search -->
    <ui-input
      class="col-span-4 row-start-1 col-start-3 h-min self-end"
      placeholder="Search emojis..."
      maxlength="16"
      autofocus
      v-model="search"
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
        v-if="emojis[i]"
        :emoji="emojis[i]"
        variant="key"
        @click="emit('click:key', emojis[i])"
      />

      <div
        v-else
        class="size-full scale-95 bg-white inset-ring-2 inset-ring-neutral-200 opacity-40 rounded-full"
      ></div>
    </div>

    <!-- Actions -->
    <ui-emoji-keyboard-button
      variant="action"
      :style="{ gridRow: ACTION_ROW_START, gridColumn: ACTION_COLUMN_START }"
      :disabled="submitDisabled"
      @click="emit('click:submit')"
    >
      <template #icon>
        <i-material-symbols-check-rounded />
      </template>
    </ui-emoji-keyboard-button>

    <ui-emoji-keyboard-button
      variant="action"
      :style="{ gridRow: ACTION_ROW_START + 1, gridColumn: ACTION_COLUMN_START }"
      @click="emit('click:backspace')"
    >
      <template #icon>
        <i-material-symbols-backspace-outline-rounded />
      </template>
    </ui-emoji-keyboard-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useFuse } from "@vueuse/integrations/useFuse";

import { EMOJIS } from "../constants/emojis";

import { Emoji } from "../types/emoji";

const ROWS = 3;
const COLS = 8;

const KEYS_ROW_START = 2;
const KEYS_ROW_END = 3;
const KEYS_COL_START = 1;
const KEYS_COL_END = 7;
const KEYS_ROWS = KEYS_ROW_END - KEYS_ROW_START + 1;
const KEYS_COLS = KEYS_COL_END - KEYS_COL_START + 1;

const KEYS = KEYS_ROWS * KEYS_COLS;
const KEYS_PER_ROW = KEYS / KEYS_ROWS;

const ACTION_ROW_START = 2;
const ACTION_COLUMN_START = 8;

defineProps<{
  submitDisabled?: boolean;
}>();

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
