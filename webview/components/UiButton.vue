<template>
  <button type="button" :class="cvaButton({ variant })">
    <span v-if="emoji" :class="cvaEmoji()">
      {{ emoji }}
    </span>
    <span :class="cvaLabel({ variant })">
      <slot>
        {{ label }}
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";

type Variant = "primary" | "secondary";

withDefaults(
  defineProps<{
    label: string;
    emoji?: string;
    variant?: Variant;
  }>(),
  {
    variant: "primary",
  },
);

const cvaButton = cva(
  [
    "flex items-center gap-x-2.5",
    "py-2.5 px-5",
    "rounded-full",
    "not-disabled:shadow-md",
    "transition-all",
    "hover:not-disabled:scale-102 active:not-disabled:scale-98",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-blue-300",
          "inset-shadow-sm inset-shadow-blue-400/20",
          "ring-2 ring-blue-400",
        ],
        secondary: ["ring ring-neutral-700 disabled:ring-neutral-400"],
      },
    },
  },
);

const cvaLabel = cva(["text-xl font-medium"], {
  variants: {
    variant: {
      primary: ["text-blue-900"],
      secondary: ["text-neutral-700 in-disabled:text-neutral-400"],
    },
  },
});

const cvaEmoji = cva(["text-2xl in-disabled:opacity-50"]);
</script>
