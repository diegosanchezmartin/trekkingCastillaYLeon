<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-item>
          <ion-button @click="goAddRoute()" color="medium">
            <ion-icon :icon="addCircleOutline" />
          </ion-button>
          <ion-toolbar>
            <ion-title size="large">Explora</ion-title>
          </ion-toolbar>
          <ion-button color="medium">
            <ion-icon :icon="searchOutline" />
          </ion-button>
        </ion-item>
      </ion-header>
      <ion-list>
        <ion-item v-for="ruta in rutas" v-bind:key="ruta.id">
          <ion-card>
            <ion-card-header>
              <ion-item>
                <ion-label>
                  <h4>{{ ruta.nombreRuta }}</h4>
                  <h3> <ion-icon :icon="locationOutline"/> {{ ruta.infoRuta }} {{ ruta.kilometros }} Kms</h3>
                </ion-label>
              </ion-item>
            </ion-card-header>
            <swiper pager="true" :options="slideOpts">
              <swiper-slide
                v-for="(photo, index) in ruta.imagenesIntroducidas"
                :key="index"
              >
                <ion-img :src="photo" />
              </swiper-slide>
            </swiper>
            <ion-card-content>
              <ion-item>
                <ion-avatar slot="end">
                  <img :src="ruta.fotoPerfilUsuario" />
                </ion-avatar>
                <ion-text color="dark">
                  <h3>{{ ruta.usuario }}</h3>
                  <h2>{{ ruta.nivelUsuario }}</h2>
                </ion-text>
                <ion-text color="medium"> </ion-text>
              </ion-item>
            </ion-card-content>
            <ion-footer>
              <ion-row>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="ruta.iconoIntroducido"></ion-icon>
                      {{ ruta.tipoRuta }}
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      {{ ruta.valoracion }} <ion-icon :icon="starOutline" />
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="timeOutline" />
                      {{ ruta.fechaPublicacion }}
                    </div>
                  </button>
                </ion-col>
              </ion-row>
            </ion-footer>
          </ion-card>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { db } from "@/main";
import { collection, getDocs } from "@firebase/firestore";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonAvatar,
  IonFooter,
  IonCol,
  IonRow,
  IonIcon,
  IonText,
  IonImg,
} from "@ionic/vue";
import {
  starOutline,
  timeOutline,
  resizeOutline,
  repeatOutline,
  flagOutline,
  analyticsOutline,
  addCircleOutline,
  searchOutline,
  locationOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

export default defineComponent({
  name: "Tab1Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonItem,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    IonAvatar,
    IonFooter,
    IonCol,
    IonRow,
    IonIcon,
    IonText,
    Swiper,
    SwiperSlide,
    IonImg,
  },
  setup() {
    const state = reactive({
      rutas: [],
    });
    const ionRouter = useIonRouter();
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const goAddRoute = async () => {
      ionRouter.push("/tabs/anadirRutaNueva");
    };
    async function obtenerRutasDisponibles() {
      const querySnapshot = await getDocs(collection(db, "rutas"));
      querySnapshot.forEach((doc) => {
        if (doc.data().tipoRuta == "rutaCircular") {
          state.rutas.push({
            id: doc.id,
            nombreRuta: doc.data().nombreRuta,
            infoRuta: doc.data().infoRuta,
            imagenesIntroducidas: doc.data().imagenesIntroducidas,
            usuario: doc.data().usuarioIntroducido,
            nivelUsuario: doc.data().nivelUsuarioIntroducido,
            tipoRuta: "Circular",
            valoracion: doc.data().valoracion,
            kilometros: doc.data().kilometros,
            fotoPerfilUsuarioIntroducida:
              doc.data().fotoPerfilUsuarioIntroducida,
            iconoIntroducido: repeatOutline,
            fechaPublicacion: doc.data().fechaPublicacion,
          });
        } else if (doc.data().tipoRuta == "rutaLineal") {
          state.rutas.push({
            id: doc.id,
            nombreRuta: doc.data().nombreRuta,
            infoRuta: doc.data().infoRuta,
            imagenesIntroducidas: doc.data().imagenesIntroducidas,
            usuario: doc.data().usuarioIntroducido,
            nivelUsuario: doc.data().nivelUsuarioIntroducido,
            tipoRuta: "Lineal",
            valoracion: doc.data().valoracion,
            kilometros: doc.data().kilometros,
            fotoPerfilUsuarioIntroducida:
              doc.data().fotoPerfilUsuarioIntroducida,
            iconoIntroducido: resizeOutline,
            fechaPublicacion: doc.data().fechaPublicacion,
          });
        }
        if (doc.data().tipoRuta == "ascension") {
          state.rutas.push({
            id: doc.id,
            nombreRuta: doc.data().nombreRuta,
            infoRuta: doc.data().infoRuta,
            imagenesIntroducidas: doc.data().imagenesIntroducidas,
            usuario: doc.data().usuarioIntroducido,
            nivelUsuario: doc.data().nivelUsuarioIntroducido,
            tipoRuta: "Ascension",
            valoracion: doc.data().valoracion,
            kilometros: doc.data().kilometros,
            fotoPerfilUsuarioIntroducida:
              doc.data().fotoPerfilUsuarioIntroducida,
            iconoIntroducido: flagOutline,
            fechaPublicacion: doc.data().fechaPublicacion,
          });
        }
        console.log(doc.id, " => ", doc.data());
      });
      console.log(state.rutas);
    }

    return {
      obtenerRutasDisponibles,
      ...toRefs(state),
      timeOutline,
      starOutline,
      resizeOutline,
      repeatOutline,
      flagOutline,
      analyticsOutline,
      addCircleOutline,
      searchOutline,
      locationOutline,
      slideOpts,
      goAddRoute,
    };
  },
  watch: {
    $route(to, from) {
      this.rutas = [];
      this.obtenerRutasDisponibles();
      console.log("aqui");
    },
  },
  mounted() {
    this.obtenerRutasDisponibles();
    console.log("Aqui");
  },
});
</script>

<style scoped>
.swiper-pagination-bullet {
  background: black;
  opacity: 0.4;
}

.swiper-pagination-bullet-active {
  background: white;
}
</style>
