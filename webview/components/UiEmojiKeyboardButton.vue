<template>
  <button :class="button({ variant })">
    <slot>
      <span v-if="emoji" class="text-4xl">
        {{ emoji.value }}
      </span>
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { cva } from "class-variance-authority";

import { Emoji } from "../types/emoji";

type Variant = "key" | "action";

withDefaults(
  defineProps<{
    variant?: Variant;
    emoji?: Emoji;
    icon?: string;
  }>(),
  {
    variant: "key",
  },
);

const button = cva(
  [
    "flex items-center justify-center",
    "shadow-md shadow-blue-100/10",
    "rounded-full",
    "aspect-square",
    "transition-all",
    "hover:scale-104 active:scale-96",
  ],
  {
    variants: {
      variant: {
        key: ["bg-white"],
        action: ["bg-blue-300"],
      },
    },
  },
);
</script>
