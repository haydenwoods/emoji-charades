import { MessageHandler } from "../types/message";
import { CreateResponse } from "../../shared/types/message";
import { useAppStore } from "../stores/app";

export const onCreateResponse: MessageHandler<CreateResponse> = () => {
  const appStore = useAppStore();
  appStore.stopLoadingOverlay("CREATE_REQUEST");
};
