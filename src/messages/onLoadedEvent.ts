import { MountedEvent } from "@shared/types/message.js";

import { MessageHandler } from "@/types/message.js";

export const onLoadedEvent: MessageHandler<MountedEvent> = async ({ app }) => {
  app.setLoading(false);
};
