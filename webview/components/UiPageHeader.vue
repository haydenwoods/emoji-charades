<template>
  <div class="w-full flex items-start">
    <div class="basis-1/5">
      <ui-button size="xs" variant="plain" label="Back" :padded="false" @click="emit('click:back')">
        <template #icon>
          <i-material-symbols-arrow-back-rounded />
        </template>
      </ui-button>
    </div>

    <div class="flex-1">
      <slot name="title">
        <h1 v-if="title" class="flex-1 text-center font-medium text-xl leading-6">
          {{ title }}
        </h1>
      </slot>
    </div>

    <div class="basis-1/5"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (event: "click:back"): void;
}>();
</script>
