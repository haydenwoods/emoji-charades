<template>
  <div class="flex items-center gap-5 flex-wrap justify-center my-auto select-none">
    <span v-for="(emoji, i) in emojis" :key="i" ref="emojiEls" class="emoji text-6xl">
      {{ emoji }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { animate, stagger } from "motion";

const props = defineProps<{
  emojis: string[];
}>();

const emojiEls = useTemplateRef("emojiEls");

onMounted(() => {
  if (!emojiEls.value) return;

  animate(
    emojiEls.value,
    {
      opacity: [0, 1],
      scale: [0, 1],
    },
    {
      delay: stagger(0.1, { startDelay: 0.5 }),
    },
  );
});
</script>
