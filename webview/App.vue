<template>
  <div v-if="!loading" class="size-full p-6 md:p-8">
    <menu-page v-if="page === Page.MENU" />
    <create-page v-else-if="page === Page.CREATE" />
    <guess-page v-else-if="page === Page.GUESS" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useAppStore, Page } from "./stores/app.js";

import { sendMessage } from "./utils/messages/index.js";

import MenuPage from "./pages/menu/Index.vue";
import CreatePage from "./pages/create/Index.vue";
import GuessPage from "./pages/guess/Index.vue";

const appStore = useAppStore();
const { loading, page } = storeToRefs(appStore);

onMounted(() => {
  sendMessage({
    type: "MOUNTED_EVENT",
  });
});
</script>
