<template>
  <div
    class="flex items-center rounded-full inset-ring-2 inset-ring-neutral-300 bg-white gap-3"
    :class="[Boolean($slots.before) && 'pl-2.5', Boolean($slots.after) && 'pr-2.5']"
  >
    <slot name="before"></slot>

    <input
      type="text"
      class="font-medium text-xl min-w-0 placeholder:text-neutral-400 !outline-none py-3 w-full"
      :class="[Boolean($slots.before) ? 'pl-0' : 'pl-5', Boolean($slots.after) ? 'pr-0' : 'pr-5']"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @keydown.enter="emit('submit')"
      v-model="modelValue"
    />

    <slot name="after"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string;
  autofocus?: boolean;
  maxlength?: number | string;
}>();

const emit = defineEmits<{
  (event: "submit"): void;
}>();

const modelValue = defineModel<string>();
</script>
