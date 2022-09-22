<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="homeOutline" />
          <ion-label>Explora</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="searchOutline" />
          <ion-label>Descubrir</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tabMensajes" href="/tabs/tabMensajes">
          <ion-icon :icon="paperPlaneOutline" />
          <ion-label>Mensajes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="personOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="this.esAdmin === true" tab="manejoUsuarios" href="/tabs/manejoUsuarios">
          <ion-icon :icon="constructOutline" />
          <ion-label>Usuarios</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  homeOutline,
  searchOutline,
  personOutline,
  paperPlaneOutline,
  constructOutline,
} from "ionicons/icons";
import { auth, db } from "@/main";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  data() {
    return {
      esAdmin: false,
    }
  },  
  setup() {
    return {
      homeOutline,
      searchOutline,
      personOutline,
      paperPlaneOutline,
      constructOutline,
    };
  },
  async mounted() {
    const doc = await db.collection("users").doc(auth.currentUser.uid).get();
    this.esAdmin = doc.data().esAdmin;
  },
});
</script>
