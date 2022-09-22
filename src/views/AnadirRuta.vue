<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Anadir ruta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <formulario-ruta @anadir-ruta="anadirRuta"></formulario-ruta>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  useIonRouter,
} from "@ionic/vue";

import FormularioRuta from '../components/FormularioRuta.vue'

import { resizeOutline, repeatOutline, flagOutline } from "ionicons/icons";

export default defineComponent({
  name: "AnadirRuta",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    IonButtons,
    FormularioRuta,
  },
  setup() {
    const ionRouter = useIonRouter();
    
    function anadirRuta(){
      ionRouter.push('/tabs/tab1');
    }
    
    return {
      anadirRuta,
      resizeOutline,
      repeatOutline,
      flagOutline,
    };
  },
});
</script>