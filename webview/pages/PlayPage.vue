<script setup lang="ts">
import { onMounted } from "vue";

import NotoBrokenHeart from "~icons/noto/broken-heart";

import { useAppStore } from "../stores/app";
import { useNotificationStore } from "../stores/notification";

import { sendMessage } from "../utils/messages";

import { useMessageListener } from "../composables/useMessageListener";
import type { PlayResponse } from "../../shared/types/message";

const appStore = useAppStore();
const notificationStore = useNotificationStore();

useMessageListener<PlayResponse>("PLAY_RESPONSE", (message) => {
  notificationStore.hideNotification("PLAY_REQUEST");
  appStore.navigateTo(appStore.mainPage);

  if (message.data.success === false) {
    notificationStore.showNotification(
      {
        id: "PLAY_FAILED",
        label: "No new puzzles",
        theme: "error",
        icon: NotoBrokenHeart,
      },
      2000,
    );
  }
});

onMounted(() => {
  notificationStore.showLoading("PLAY_REQUEST", "Finding a new puzzle");

  sendMessage({
    type: "PLAY_REQUEST",
  });
});
</script>
