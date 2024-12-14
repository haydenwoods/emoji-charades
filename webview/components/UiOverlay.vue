<template>
  <div ref="background" :class="cvaBackground({ theme, open })">
    <div ref="modal" :class="cvaModal({ theme })">
      <span :class="cvaModalIcon({ theme })">
        <slot name="icon"></slot>
      </span>
      <span :class="cvaModalLabel({ theme })">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from "vue";
import { animate } from "motion";
import { cva } from "class-variance-authority";

type Theme = "primary" | "error" | "success";

const props = withDefaults(
  defineProps<{
    label?: string;
    theme?: Theme;
    open?: boolean;
  }>(),
  {
    label: undefined,
    open: true,
    theme: "primary",
  },
);

const background = useTemplateRef<HTMLDivElement>("background");
const modal = useTemplateRef<HTMLDivElement>("modal");

const cvaBackground = cva(
  [
    "background",
    "fixed top-0 left-0",
    "size-full",
    "flex items-center justify-center",
    "opacity-0",
    "select-none",
  ],
  {
    variants: {
      theme: {
        primary: ["bg-amber-100/40"],
        error: ["bg-red-100/40"],
        success: ["bg-green-100/40"],
      },
      open: {
        true: "",
        false: "pointer-events-none",
      },
    },
  },
);

const cvaModal = cva(["modal", "px-5 py-4", "rounded-full", "flex items-center gap-x-2"], {
  variants: {
    theme: {
      primary: ["bg-amber-300"],
      error: ["bg-red-300"],
      success: ["bg-green-300"],
    },
  },
});

const cvaModalLabel = cva(["text-2xl", "font-medium"], {
  variants: {
    theme: {
      primary: ["text-amber-900"],
      error: ["text-red-900"],
      success: ["text-green-900"],
    },
  },
});

const cvaModalIcon = cva(["text-3xl"], {
  variants: {
    theme: {
      primary: ["text-amber-900"],
      error: ["text-red-900"],
      success: ["text-green-900"],
    },
  },
});

const animateOpen = () => {
  if (!background.value || !modal.value) return;
  animate([
    [background.value, { opacity: [0, 1] }, { duration: 0.2 }],
    [modal.value, { opacity: [0, 1], scale: [0.6, 1] }, { type: "spring", duration: 0.4, at: 0.1 }],
  ]);
};

const animateClosed = () => {
  if (!background.value || !modal.value) return;
  animate([
    [modal.value, { opacity: [1, 0], scale: [1, 0.6] }, { type: "spring", duration: 0.4 }],
    [background.value, { opacity: [1, 0] }, { duration: 0.2, at: 0.1 }],
  ]);
};

watch(
  () => props.open,
  (newOpen) => {
    if (newOpen) {
      animateOpen();
    } else {
      animateClosed();
    }
  },
  {
    immediate: true,
  },
);
</script>
