<template>
  <transition-group
    tag="div"
    class="flex justify-center flex-wrap"
    :class="
      {
        xs: 'gap-1 sm:gap-1.5',
        sm: 'gap-2 sm:gap-3',
        md: 'gap-3 sm:gap-4',
      }[size]
    "
    @enter="onEnter"
  >
    <ui-emoji
      v-for="(emoji, i) in emojis"
      :key="i"
      class="emoji"
      :class="[
        animate ? 'pop-in' : '',
        {
          xs: 'text-2xl sm:text-[1.75rem]',
          sm: 'text-4xl sm:text-5xl',
          md: 'text-5xl sm:text-6xl',
        }[size],
      ]"
    >
      {{ emoji }}
    </ui-emoji>
  </transition-group>
</template>

<script setup lang="ts">
import { animatePop } from "../../utils/animate";

type Size = "xs" | "sm" | "md";

const props = withDefaults(
  defineProps<{
    size?: Size;
    animate?: boolean;
  }>(),
  {
    size: "md",
    animate: true,
  },
);

const emojis = defineModel<string[]>("emojis");

const onEnter = (element: Element) => {
  if (!props.animate) return;
  animatePop(element);
};
</script>
