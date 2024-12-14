<template>
  <div
    class="flex items-center rounded-full inset-ring-2 inset-ring-neutral-300 bg-white gap-3"
    :class="[Boolean($slots.before) && 'pl-2.5', Boolean($slots.after || showClear) && 'pr-2.5']"
  >
    <slot name="before"></slot>

    <input
      ref="input"
      v-model="modelValue"
      type="text"
      class="font-medium text-xl min-w-0 placeholder:text-neutral-400 !outline-none py-3 w-full"
      :class="[
        Boolean($slots.before) ? 'pl-0' : 'pl-5',
        Boolean($slots.after || showClear) ? 'pr-0' : 'pr-5',
      ]"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @keydown.enter="emit('submit')"
    />

    <slot name="after">
      <button
        v-if="showClear && modelValue && modelValue.length > 0"
        id="submit-button"
        type="button"
        class="not-disabled:cursor-pointer p-1 flex items-center justify-center transition-colors"
        @click="clear"
      >
        <i-material-symbols-cancel-outline-rounded
          class="text-xl text-neutral-600 in-disabled:text-neutral-400"
        />
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";

defineProps<{
  placeholder?: string;
  autofocus?: boolean;
  maxlength?: number | string;
  showClear?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit"): void;
}>();

const modelValue = defineModel<string>();

const input = useTemplateRef("input");

const clear = () => {
  modelValue.value = "";
  input.value?.focus();
};
</script>
