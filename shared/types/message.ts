export type WebViewMountedRequest = {
  type: "WEBVIEW_MOUNTED_REQUEST";
};

export type WebViewMountedResponse = {
  type: "WEBVIEW_MOUNTED_RESPONSE";
  data: {
    user?: {
      id: string;
      username: string;
    };
  };
};

export type Message = WebViewMountedRequest | WebViewMountedResponse;
