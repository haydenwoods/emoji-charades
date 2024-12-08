<template>
  <button type="button" :class="cvaButton({ variant, size, padded })">
    <!-- Left -->
    <span v-if="emoji" :class="cvaEmoji({ size })">
      {{ emoji }}
    </span>
    <span v-else-if="$slots.icon" :class="cvaIcon({ variant, size })">
      <slot name="icon"></slot>
    </span>

    <!-- Middle -->
    <span :class="cvaLabel({ variant, size })">
      <slot>
        {{ label }}
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

withDefaults(
  defineProps<{
    label: string;
    emoji?: string;

    variant?: Variant;
    size?: Size;
    padded?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    padded: true,
  },
);

const cvaButton = cva(
  [
    "flex items-center gap-x-2.5",
    "rounded-full",
    "transition-all",
    "hover:not-disabled:scale-102 active:not-disabled:scale-98",
    "not-disabled:cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-blue-300",
          "not-disabled:shadow-md",
          "inset-shadow-sm inset-shadow-blue-400/20",
          "ring-2 ring-blue-400",
        ],
        secondary: ["bg-neutral-50", "ring-2 ring-neutral-300 disabled:ring-neutral-200"],
        plain: [],
      },
      size: {
        sm: "",
        md: "",
      },
      padded: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        padded: true,
        class: "py-1 px-3",
      },
      {
        size: "md",
        padded: true,
        class: "py-2.5 px-5",
      },
    ],
  },
);

const cvaLabel = cva(["text-center w-full font-medium whitespace-nowrap"], {
  variants: {
    variant: {
      primary: ["text-blue-900"],
      secondary: ["text-neutral-600 in-disabled:text-neutral-400"],
      plain: ["text-neutral-600 in-disabled:text-neutral-400"],
    },
    size: {
      sm: "text-lg",
      md: "text-xl",
    },
  },
});

const cvaEmoji = cva(["in-disabled:opacity-50"], {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl",
    },
  },
});

const cvaIcon = cva([], {
  variants: {
    variant: {
      primary: ["text-blue-900"],
      secondary: ["text-neutral-600 in-disabled:text-neutral-400"],
      plain: ["text-neutral-600 in-disabled:text-neutral-400"],
    },
    size: {
      sm: "text-xl",
      md: "text-2xl",
    },
  },
});
</script>
