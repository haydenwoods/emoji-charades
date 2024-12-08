<template>
  <draggable
    v-model="emojis"
    group="emojis"
    class="flex items-center gap-1.5 flex-wrap justify-center select-none"
    ghost-class="bg-neutral-200"
    drag-class="opacity-0"
    tag="div"
    :disabled="!sortable"
    :animation="200"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <span
        class="emoji text-6xl p-2 rounded-full transition-colors"
        :class="[sortable ? 'cursor-move hover:bg-neutral-200' : '']"
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

defineProps<{
  sortable?: boolean;
}>();

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
