<template>
  <transition-group
    tag="div"
    class="flex items-center gap-0.5 flex-wrap justify-center"
    @enter="onEnter"
  >
    <div
      v-for="(emoji, i) in emojis"
      :key="i"
      :class="[
        'emoji',
        'font-emoji',
        'aspect-square',
        'flex items-center justify-center',
        'select-none',
      ]"
    >
      <span
        :class="
          {
            xs: 'text-4xl p-1',
            sm: 'text-5xl p-1.5',
            md: 'text-6xl p-2',
          }[size]
        "
      >
        {{ emoji }}
      </span>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from "vue";

import { animatePop } from "../utils/animate";

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
  animatePop(element);
};

onMounted(() => {
  if (props.animate) {
    nextTick(() => {
      try {
        animatePop(".emoji", "in", true);
      } catch {}
    });
  }
});
</script>
