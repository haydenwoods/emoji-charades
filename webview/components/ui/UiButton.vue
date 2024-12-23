<template>
  <button type="button" :class="cvaButton({ variant, size, padded })">
    <!-- Left -->
    <span v-if="$slots.icon" :class="cvaIcon({ variant, size })">
      <slot name="icon"></slot>
    </span>

    <!-- Middle -->
    <span v-if="label || $slots.default" :class="cvaLabel({ variant, size })">
      <slot>
        {{ label }}
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";

type Variant = "primary" | "secondary";
type Size = "xs" | "sm" | "md";

withDefaults(
  defineProps<{
    label?: string;
    emoji?: string;

    variant?: Variant;
    size?: Size;
    padded?: boolean;
  }>(),
  {
    label: undefined,
    emoji: undefined,
    variant: "primary",
    size: "md",
    padded: true,
  },
);

const cvaButton = cva(
  [
    "flex items-center justify-center",
    "rounded-full",
    "transition-all",
    "hover:not-disabled:scale-103 active:not-disabled:scale-97",
    "not-disabled:cursor-pointer",
    "disabled:opacity-70",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-amber-300",
          "inset-shadow-sm inset-shadow-amber-400/25",
          "border-2 border-amber-400",
        ],
        secondary: ["bg-white", "border-2 border-slate-300 "],
        plain: [],
      },
      size: {
        xs: "gap-x-1",
        sm: "gap-x-1.5",
        md: "gap-x-2.5",
      },
      padded: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        padded: true,
        class: "py-0.5 px-2",
      },
      {
        size: "sm",
        padded: true,
        class: "py-1 px-3",
      },
      {
        size: "md",
        padded: true,
        class: "py-1.5 px-4 sm:py-2.5 sm:px-5",
      },
    ],
  },
);

const cvaLabel = cva(["font-medium whitespace-nowrap"], {
  variants: {
    variant: {
      primary: ["text-amber-900"],
      secondary: ["text-slate-600"],
      plain: ["text-slate-800"],
    },
    size: {
      xs: "text-sm sm:text-base",
      sm: "text-base sm:text-lg",
      md: "text-lg sm:text-xl",
    },
  },
});

const cvaIcon = cva([], {
  variants: {
    variant: {
      primary: ["text-amber-950"],
      secondary: ["text-slate-600"],
      plain: ["text-slate-800"],
    },
    size: {
      xs: "text-base",
      sm: "text-xl",
      md: "text-2xl",
    },
  },
});
</script>
