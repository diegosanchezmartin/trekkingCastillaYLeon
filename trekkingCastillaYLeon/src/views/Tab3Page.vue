<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Usersame</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-avatar slot="start">
                <img src="../pictures/FotoPerfil1.jpg" />
              </ion-avatar>
              <ion-label color="dark">@diegosanchezmartin</ion-label>
            </ion-item>
            <ion-item>
              <ion-label color="primary">Rutas realizadas: </ion-label>
            </ion-item>
            <ion-item>
              <ion-label color="secondary">Rutas añadidas: </ion-label>
            </ion-item>
            <ion-item>
              <ion-label color="tertiary">Rutas modificadas: </ion-label>
            </ion-item>
            <ion-item>
              <ion-label
                >Nuevo aventurero con muchas ganas de patear!</ion-label
              >
              <ion-button color="medium">
                <ion-icon :icon="pencilOutline" />
              </ion-button>
              <ion-button color="medium">
                <ion-icon :icon="cogOutline" />
              </ion-button>
            </ion-item>
          </ion-card-header>
          <ion-card-content> </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-row>
            <ion-col v-for="ruta in rutas" v-bind:key="ruta.id">
              <swiper pager="true" :options="slideOpts">
                <swiper-slide
                  v-for="(imagen, index) in ruta.imagenes"
                  v-bind:key="index"
                >
                  <ion-img :src="imagen.webviewPath" />
                </swiper-slide>
              </swiper>
            </ion-col>
          </ion-row>
        </ion-card>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { cogOutline, pencilOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  IonCol,
  IonRow,
  IonImg,
} from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

export default defineComponent({
  name: "Tab3Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonAvatar,
    IonLabel,
    IonButton,
    IonIcon,
    IonCol,
    IonRow,
    Swiper,
    SwiperSlide,
    IonImg,
  },
  computed: {
    rutas() {
      return this.$store.getters.rutasPerfil;
    },
  },
  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    return {
      slideOpts,
      cogOutline,
      pencilOutline,
    };
  },
});
</script>
