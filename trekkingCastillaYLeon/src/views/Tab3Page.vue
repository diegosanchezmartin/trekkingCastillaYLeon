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
          <ion-title size="large"> {{ currentUser.displayName }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-avatar slot="start">
                <img :src=imagenPerfil />
              </ion-avatar>
              <ion-label>{{ currentUser.displayName }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-label color="primary"
                >Rutas realizadas: {{ rutasRealizadas }}</ion-label
              >
            </ion-item>
            <ion-item>
              <ion-label color="secondary"
                >Rutas añadidas: {{ rutasAnadidas }}</ion-label
              >
            </ion-item>
            <ion-item>
              <ion-label color="tertiary"
                >Rutas modificadas: {{ rutasModificadas }}</ion-label
              >
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
          <ion-row size="4">
            <ion-col size="4" v-for="ruta in rutas" v-bind:key="ruta.id">
              <swiper pager="true" :options="slideOpts">
                <swiper-slide
                  v-for="(imagen, index) in ruta.fotos"
                  v-bind:key="index"
                >
                  <ion-img :src="imagen" />
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
import { defineComponent, reactive, toRefs } from "vue";
import { doc, getDoc, getDocs, collection } from "@firebase/firestore";
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
import { auth, db } from "@/main";
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
  data() {
    return {
      rutasRealizadas: 0,
      rutasAnadidas: 0,
      rutasModificadas: 0,
    };
  },
  setup() {
    const state = reactive({
      rutas: [],
      imagenPerfil: "",
    });
    const currentUser = auth.currentUser;
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    async function obtenerRutasUsuario() {
      const contadores = doc(db, "users", auth.currentUser.uid);
      const querySnapshot = await getDoc(contadores);
      const infoUsuario = querySnapshot.data();
      this.rutasRealizadas = infoUsuario.rutasRealizadas;
      this.rutasModificadas = infoUsuario.rutasModificadas;
      this.rutasAnadidas = infoUsuario.rutasAnadidas;

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => (state.imagenPerfil = result.data().fotoPerfil));

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("rutasUsuario")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((collection) => {
            state.rutas.push({
              fotos: collection.data().imagenesIntroducidas,
            });
          });
        });
    }
    return {
      obtenerRutasUsuario,
      ...toRefs(state),
      currentUser,
      slideOpts,
      cogOutline,
      pencilOutline,
    };
  },
  watch: {
    $route(to, from) {
      this.rutas = [];
      this.obtenerRutasUsuario();
    },
  },
  mounted() {
    this.obtenerRutasUsuario();
  },
});
</script>
