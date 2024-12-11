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
        <div v-if="title" class="flex justify-center items-center gap-x-2">
          <span class="text-lg">
            <slot name="title:icon"></slot>
          </span>
          <h1 class="text-center font-medium text-xl leading-6">
            {{ title }}
          </h1>
        </div>
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
