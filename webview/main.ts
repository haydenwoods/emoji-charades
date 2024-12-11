import { createApp } from "vue";
import { createPinia } from "pinia";

import { mockMessages } from "@/mock/messages";

import App from "@/App.vue";

import "@/css/fonts.css";
import "@/css/tailwind.css";
import "@/css/transitions.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);

app.mount("#app");

// Mocking
if (import.meta.env.DEV) {
  mockMessages();
}
