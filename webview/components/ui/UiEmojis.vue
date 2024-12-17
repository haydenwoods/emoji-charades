<template>
  <transition-group tag="div" class="flex justify-center gap-3 sm:gap-4 flex-wrap" @enter="onEnter">
    <span
      v-for="(emoji, i) in emojis"
      :key="i"
      class="pop-in emoji font-emoji select-none"
      :class="
        {
          xs: 'text-3xl sm:text-4xl',
          sm: 'text-4xl sm:text-5xl',
          md: 'text-5xl sm:text-6xl',
        }[size]
      "
    >
      {{ emoji }}
    </span>
  </transition-group>
</template>

<script setup lang="ts">
import { animatePop } from "../../utils/animate";

type Size = "xs" | "sm" | "md";

withDefaults(
  defineProps<{
    size?: Size;
  }>(),
  {
    size: "md",
    animate: true,
  },
);

const emojis = defineModel<string[]>("emojis");

const onEnter = (element: Element) => {
  animatePop(element);
};
</script>
