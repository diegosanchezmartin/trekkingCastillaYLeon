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
          <ion-title size="large"> {{ nombreUser }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card>
          <ion-card-header class="cabeceraRutas">
            <ion-item>
              <ion-grid>
                <ion-col>
                  <ion-row>
                    <ion-item>
                      <ion-avatar slot="start">
                        <img :src="imagenPerfil" />
                      </ion-avatar>
                      <ion-label>{{ currentUser.displayName }}</ion-label>
                      <ion-item>
                        <ion-button color="medium">
                          <ion-icon :icon="pencilOutline" />
                        </ion-button>
                        <ion-button color="medium">
                          <ion-icon :icon="cogOutline" />
                        </ion-button>
                      </ion-item>
                    </ion-item>
                  </ion-row>
                  <ion-row>
                    <ion-grid class="gridRutas">
                      <ion-row class="filaRutas">
                        <ion-card class="columnaRutas">
                          <ion-card-header>
                            <ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >Rutas</ion-label
                              >
                              <ion-row> </ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >realizadas:</ion-label
                              >
                            </ion-row>
                          </ion-card-header>
                          <ion-card-content>
                            <ion-label class="etiquetaRutas" color="primary">
                              {{ rutasRealizadas }}
                            </ion-label>
                          </ion-card-content>
                        </ion-card>
                        <ion-card class="columnaRutas">
                          <ion-card-header>
                            <ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >Rutas</ion-label
                              >
                              <ion-row> </ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >añadidas:</ion-label
                              >
                            </ion-row>
                          </ion-card-header>
                          <ion-card-content>
                            <ion-label class="etiquetaRutas" color="primary">
                              {{ rutasAnadidas }}
                            </ion-label>
                          </ion-card-content>
                        </ion-card>
                        <ion-card class="columnaRutas">
                          <ion-card-header>
                            <ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >Rutas</ion-label
                              >
                              <ion-row> </ion-row>
                              <ion-label class="etiquetaRutas" color="primary"
                                >modificadas:</ion-label
                              >
                            </ion-row>
                          </ion-card-header>
                          <ion-card-content>
                            <ion-label class="etiquetaRutas" color="primary">
                              {{ rutasModificadas }}
                            </ion-label>
                          </ion-card-content>
                        </ion-card>
                      </ion-row>
                    </ion-grid>
                  </ion-row>
                </ion-col>
              </ion-grid>
            </ion-item>
          </ion-card-header>
          <ion-card-content>
            Nuevo aventurero con muchas ganas de patear!
          </ion-card-content>
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
      nombreUser: "",
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
        .then((result) => {
          (state.imagenPerfil = result.data().fotoPerfil),
            (state.nombreUser =
              result.data().nombre + " " + result.data().apellidos);
        });

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

<style scoped>
.cabeceraRutas {
  padding: 0px;
  padding-inline: 0px;
}
.filaRutas {
  display: flex;
  justify-content: space-between;
}
.columnaRutas {
  width: 32%;
  margin: 0px;
}
.etiquetaRutas {
  font-size: x-small;
}

.gridRutas {
  margin: 5% 0% -3% 0%;
}


</style>
