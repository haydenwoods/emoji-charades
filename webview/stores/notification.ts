import { Component, readonly, ref } from "vue";
import { defineStore } from "pinia";

import { UiNotificationProps } from "../components/ui/UiNotification.vue";

const OPEN_CLOSE_ANIMATION_MS = 500;

export type Notification = {
  id: string;
  label: UiNotificationProps["label"];
  icon: Component | "loading";
  theme: UiNotificationProps["theme"];
  open: UiNotificationProps["open"];
};

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([]);

  const showNotification = (notification: Omit<Notification, "open">, hideAfter?: number): void => {
    notifications.value.push({
      ...notification,
      open: true,
    });

    if (hideAfter) {
      setTimeout(() => hideNotification(notification.id), hideAfter);
    }
  };

  const hideNotification = (id: Notification["id"]): void => {
    const notificationIndex = notifications.value.findIndex(
      (notification) => notification.id === id,
    );
    notifications.value[notificationIndex].open = false;

    setTimeout(() => removeNotification(id), OPEN_CLOSE_ANIMATION_MS);
  };

  const removeNotification = (id: Notification["id"]): void => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id);
  };

  const showLoading = (id: Notification["id"], label: Notification["label"] = "Loading"): void => {
    showNotification({
      id,
      label,
      icon: "loading",
      theme: "primary",
    });
  };

  const isShowing = (id: Notification["id"]): boolean => {
    const notification = notifications.value.find(
      (notification) => notification.id === id && notification.open,
    );
    return Boolean(notification);
  };

  return {
    notifications: readonly(notifications),
    showNotification,
    hideNotification,
    showLoading,
    isShowing,
  };
});
