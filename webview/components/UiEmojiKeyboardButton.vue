<template>
  <button :class="cvaButton({ variant })">
    <span v-if="$slots.icon" :class="cvaIcon({ variant })">
      <slot name="icon"></slot>
    </span>

    <span v-else-if="emoji" class="text-4xl md:text-5xl">
      {{ emoji.value }}
    </span>
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

const cvaButton = cva(
  [
    "flex items-center justify-center",
    "size-full",
    "rounded-full",
    "transition-all",
    "hover:not-disabled:scale-103 active:not-disabled:scale-97",
    "not-disabled:cursor-pointer",
  ],
  {
    variants: {
      variant: {
        key: [
          "bg-white",
          "border-2 border-neutral-300",
          "inset-shadow-sm inset-shadow-neutral-200/20",
        ],
        action: [
          "bg-blue-300",
          "inset-shadow-sm inset-shadow-white/10",
          "border-2 border-blue-400",
        ],
      },
    },
  },
);

const cvaIcon = cva(["text-3xl md:text-4xl"], {
  variants: {
    variant: {
      key: ["text-neutral-900"],
      action: ["text-blue-900 in-disabled:text-blue-300"],
    },
  },
});
</script>
