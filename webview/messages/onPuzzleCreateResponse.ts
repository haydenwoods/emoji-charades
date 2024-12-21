import { useNotificationStore } from "../stores/notification";

import { MessageHandler } from "../types/message";
import { PuzzleCreateResponse } from "../../shared/types/message";

export const onPuzzleCreateResponse: MessageHandler<PuzzleCreateResponse> = () => {
  const notificationStore = useNotificationStore();
  notificationStore.hideNotification("PUZZLE_CREATE_REQUEST");
};
