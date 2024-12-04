import { WebViewMountedResponse } from "../../../../shared/types/message";
import { useAppStore } from "../../../stores/app";

export const onWebViewMountedResponse = (message: WebViewMountedResponse) => {
  const appStore = useAppStore();
  appStore.user = message.data.user;
};
