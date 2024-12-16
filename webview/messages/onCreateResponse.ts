import { useNotificationStore } from "../stores/notification";

import { MessageHandler } from "../types/message";
import { CreateResponse } from "../../shared/types/message";

export const onCreateResponse: MessageHandler<CreateResponse> = () => {
  const notificationStore = useNotificationStore();
  notificationStore.hideNotification("CREATE_REQUEST");
};
