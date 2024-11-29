import { Icon } from "@iconify/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import pluginVueGtag from "vue-gtag";
import App from "./App.vue";

// #region : CSS
import "@/assets/css/reset.css";
import "@/assets/css/variable.scss";
import "@/assets/css/transition.scss";
import "@/assets/css/main.scss";
//  #endregion

// icon
import "./utils/icon";

const app = createApp(App);

// Vue Plugins
app.use(createPinia());

// Icon
app.component("Icon", Icon);

// Google Analytics
// app.use(pluginVueGtag, {
//   config: {
//     id: "###", // Change to yout Google Analytics ID
//   },
// }, router);

// Mount it
app.mount("#app");
