import { useAppStore } from "../../../stores/app";

import { UserDataEvent } from "../../../../shared/types/message";

export const onUserDataEvent = (message: UserDataEvent) => {
  const appStore = useAppStore();
  appStore.user = message.data.user;
};
