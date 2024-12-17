<template>
  <div ref="background" :class="cvaBackground({ theme, open })">
    <div ref="modal" :class="cvaModal({ theme })">
      <span v-if="icon || $slots.icon" :class="cvaModalIcon({ theme })">
        <slot name="icon">
          <props.icon />
        </slot>
      </span>

      <span :class="cvaModalLabel({ theme })">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, onMounted, useTemplateRef, watch } from "vue";
import { animate } from "motion";
import { cva } from "class-variance-authority";

export type UiNotificationProps = {
  label: string;
  icon?: Component;
  theme?: "primary" | "error" | "success";
  open?: boolean;
};

const props = withDefaults(defineProps<UiNotificationProps>(), {
  theme: "primary",
  icon: undefined,
  open: true,
});

const background = useTemplateRef<HTMLDivElement>("background");
const modal = useTemplateRef<HTMLDivElement>("modal");

const cvaBackground = cva(
  [
    "background",
    "fixed top-0 left-0 z-50",
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

const cvaModal = cva(
  ["modal", "px-3 sm:px-5 py-2 sm:py-4", "rounded-full", "flex items-center gap-x-3"],
  {
    variants: {
      theme: {
        primary: ["bg-amber-300"],
        error: ["bg-red-200"],
        success: ["bg-green-200"],
      },
    },
  },
);

const cvaModalLabel = cva(["text-xl sm:text-2xl", "font-medium"], {
  variants: {
    theme: {
      primary: ["text-amber-950"],
      error: ["text-red-950"],
      success: ["text-green-950"],
    },
  },
});

const cvaModalIcon = cva(["text-2xl sm:text-3xl"], {
  variants: {
    theme: {
      primary: ["text-amber-950"],
      error: ["text-red-950"],
      success: ["text-green-950"],
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
);

onMounted(() => {
  if (props.open) {
    animateOpen();
  }
});
</script>
