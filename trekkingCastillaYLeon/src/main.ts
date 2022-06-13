import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeAuth, browserSessionPersistence } from "firebase/auth";

//import { isPlatform } from '@ionic/vue';
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP3_p-kaEpdtkb3m1hV6D8cdj7yzD02K0",
  authDomain: "trekkingcastillayleon.firebaseapp.com",
  projectId: "trekkingcastillayleon",
  storageBucket: "trekkingcastillayleon.appspot.com",
  messagingSenderId: "768183214249",
  appId: "1:768183214249:web:589eb37bc5f6e5b7f189b8",
  measurementId: "G-XPR6FCHEVY",
};

// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(appFirebase);

initializeAuth(appFirebase, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
});
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

let app: any;

import { defineCustomElements } from "@ionic/pwa-elements/loader";

auth.onAuthStateChanged(async (user) => {
  if (!app) {
    app = createApp(App)
      .use(IonicVue)
      .use(router);

    router.isReady().then(() => {
      app.mount("#app");

      defineCustomElements(window);
    });
  }
});
