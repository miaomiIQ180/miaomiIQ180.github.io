import { Icon } from "@iconify/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

// #region : CSS
import "@/assets/css/reset.css";
import "@/assets/css/variable.scss";
import "@/assets/css/transition.scss";
import "@/assets/css/main.scss";
//  #endregion

// icon
import "./utils/icon";

// Firebase
import { VueFire } from "vuefire";
import { firebaseApp } from "./firebase/index";

const app = createApp(App);

// Vue Plugins
app.use(createPinia());

// Icon
app.component("Icon", Icon);

// Firebase
app.use(VueFire, { firebaseApp });

// Mount it
app.mount("#app");
