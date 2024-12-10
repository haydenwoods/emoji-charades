<template>
  <draggable
    v-model="emojis"
    group="emojis"
    class="flex items-center gap-0.5 flex-wrap justify-center"
    drag-class="!opacity-0"
    tag="transition-group"
    :component-data="{
      type: 'transition-group',
      tag: 'div',
      name: !dragging ? 'emojis' : '',
    }"
    :disabled="!edit"
    :animation="400"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <span
        class="emoji rounded-full transition-opacity aspect-square flex items-center justify-center select-none"
        :class="[
          edit ? 'cursor-move hover:bg-neutral-200' : '',
          {
            sm: 'text-5xl p-1.5',
            md: 'text-6xl p-2',
          }[size],
        ]"
      >
        {{ element }}
      </span>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { animate, stagger } from "motion";
import Draggable from "vuedraggable";

type Size = "sm" | "md";

withDefaults(
  defineProps<{
    size?: Size;
    edit?: boolean;
  }>(),
  {
    size: "md",
  },
);

const emojis = defineModel<string[]>("emojis");

const dragging = ref<boolean>(false);

onMounted(() => {
  nextTick(() => {
    if (document.getElementsByClassName("emoji").length <= 0) return;
    animate(
      ".emoji",
      {
        opacity: [0, 1],
        scale: [0, 1],
      },
      {
        delay: stagger(0.1, { startDelay: 0.25 }),
      },
    );
  });
});
</script>

<style>
.emojis-enter-from,
.emojis-leave-to {
  opacity: 0;
}

.emojis-enter-to,
.emojis-leave-from {
  opacity: 1;
}
</style>
