<template>
  <div>
    <ui-notification
      v-for="{ id, open, label, icon, theme } in notifications"
      :id="`notification-${id}`"
      :key="id"
      :open="open"
      :label="label"
      :icon="icon"
      :theme="theme"
    >
      <template v-if="icon === 'loading'" #icon>
        <ui-loader />
      </template>
    </ui-notification>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotificationStore } from "../../stores/notification";

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>
