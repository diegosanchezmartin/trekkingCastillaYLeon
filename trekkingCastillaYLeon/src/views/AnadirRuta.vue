<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Anadir ruta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Añadir Ruta</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'AnadirRuta',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>