<template>
  <div class="w-full flex items-start">
    <div class="basis-1/6">
      <slot name="left">
        <ui-button
          v-if="showBack"
          size="xs"
          variant="plain"
          label="Back"
          :padded="false"
          @click="emit('click:back')"
        >
          <template #icon>
            <i-material-symbols-arrow-back-rounded />
          </template>
        </ui-button>
      </slot>
    </div>

    <div class="flex-1">
      <slot name="title">
        <div v-if="title" class="flex justify-center items-center gap-x-2">
          <span class="text-base sm:text-lg">
            <slot name="title:icon"></slot>
          </span>
          <h1 class="text-center font-medium text-lg sm:text-xl leading-6">
            {{ title }}
          </h1>
        </div>
      </slot>
    </div>

    <div class="basis-1/6">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    showBack?: boolean;
  }>(),
  {
    title: undefined,
    showBack: true,
  },
);

const emit = defineEmits<{
  (event: "click:back"): void;
}>();
</script>
