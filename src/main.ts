import { Icon } from "@iconify/vue";
import { createApp } from "vue";
import pluginVueGtag from "vue-gtag";
import App from "./App.vue";

// #region : CSS
import "normalize.css";
import "@/assets/css/variable.scss";
import "@/assets/css/transition.scss";
import "@/assets/css/main.scss";
//  #endregion

const app = createApp(App);

// Global Component
app.component("Icon", Icon);

// Google Analytics
app.use(pluginVueGtag, {
  config: {
    id: "###", // Change to yout Google Analytics ID
  },
});

// Mount it
app.mount("#app");
