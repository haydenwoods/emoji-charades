<template>
  <div v-if="!loading" class="size-full p-6 md:p-8">
    <choose-topic-page v-if="page === Page.CREATE_CHOOSE_TOPIC" />
    <type-page v-else-if="page === Page.CREATE_TYPE" />
    <guess-page v-else-if="page === Page.GUESS" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app.js";

import { sendMessage } from "./utils/messages/index.js";

const appStore = useAppStore();
const { loading, page } = storeToRefs(appStore);

onMounted(() => {
  sendMessage({
    type: "MOUNTED_EVENT",
  });
});
</script>
