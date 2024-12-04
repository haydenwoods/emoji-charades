import { createApp } from "vue";
import { createPinia } from "pinia";

import { mockMessages } from "@/mock/devvit-app.js";

import App from "@/App.vue";

import "@/utils/messages/listeners/index.js";

import "@/css/fonts.css";
import "@/css/index.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);

app.mount("#app");

// Mocking
if (import.meta.env.DEV) {
  mockMessages();
}
