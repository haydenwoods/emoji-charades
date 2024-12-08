<template>
  <div class="size-full flex flex-col items-center justify-center">
    <div class="w-full max-w-sm flex flex-col items-center gap-y-8">
      <h1 class="text-4xl font-semibold">Emoji Game</h1>
      <ui-button class="w-full" @click="onCreateClicked">Create</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Page, useAppStore } from "../../stores/app";

const appStore = useAppStore();

const onCreateClicked = () => {
  appStore.navigateTo(Page.CREATE);
};
</script>
