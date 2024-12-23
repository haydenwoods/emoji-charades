<template>
  <span :class="cvaTag({ size, color })">
    <span v-if="$slots.icon" class="font-emoji">
      <slot name="icon"></slot>
    </span>
    <span>
      {{ label }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";

export type UITagSize = "md" | "lg";
export type UITagColor =
  | "blue"
  | "orange"
  | "red"
  | "emerald"
  | "purple"
  | "indigo"
  | "yellow"
  | "amber";

withDefaults(
  defineProps<{
    size?: UITagSize;
    color?: UITagColor;
    label: string;
  }>(),
  {
    size: "md",
    color: "amber",
  },
);

const cvaTag = cva(["inline-flex items-center", "rounded-full", "font-medium"], {
  variants: {
    size: {
      md: "text-sm sm:text-base px-1.5 py-0.5 gap-x-1",
      lg: "text-base sm:text-xl px-2.5 py-1 gap-x-1.5",
    },
    color: {
      blue: "bg-blue-300 text-blue-900",
      orange: "bg-orange-300 text-orange-900",
      red: "bg-red-300 text-red-900",
      emerald: "bg-emerald-300 text-emerald-900",
      purple: "bg-purple-300 text-purple-900",
      indigo: "bg-indigo-300 text-indigo-900",
      yellow: "bg-yellow-200 text-yellow-900",
      amber: "bg-amber-300 text-amber-900",
    },
  },
});
</script>
