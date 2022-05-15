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
                  <h3>{{ ruta.infoRuta }} {{ ruta.kilometros }} Kms</h3>
                </ion-label>
              </ion-item>
            </ion-card-header>
            <swiper pager="true" :options="slideOpts">
              <swiper-slide
                v-for="(imagen, index) in ruta.imagenes"
                v-bind:key="index"
              >
                <ion-img :src="imagen.webviewPath" />
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
                      <ion-icon :icon="starOutline" /> {{ ruta.valoracion }}
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="timeOutline" />
                      {{ ruta.tiempoPublicacion }}
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
import { defineComponent } from "vue";
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
  data(){
    return {
      rutas: []
    }
  },
  setup() {
    const ionRouter = useIonRouter();
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const goAddRoute = async () => {
      ionRouter.push("/tabs/anadirRutaNueva");
    };
    return {
      timeOutline,
      starOutline,
      resizeOutline,
      repeatOutline,
      flagOutline,
      analyticsOutline,
      addCircleOutline,
      searchOutline,
      slideOpts,
      goAddRoute,
    };
  },
  methods: {
    async obtenerRutasDisponibles() {
      const querySnapshot = await getDocs(collection(db, "rutas"));
      querySnapshot.forEach((doc) => {
        if(doc.data().tipoRuta == "rutaCircular") {
          this.rutas.push({
          id: doc.id,
          nombreRuta: doc.data().nombreRuta,
          infoRuta: doc.data().infoRuta,
          imagenesIntroducidas: doc.data().imagenesIntroducidas,
          usuario: doc.data().usuarioIntroducido,
          nivelUsuario: doc.data().nivelUsuarioIntroducido,
          tipoRuta: "Circular",
          valoracion: doc.data().valoracion,
          tiempoPublicacionIntroducido: doc.data().tiempoPublicacionIntroducido,
          kilometros: doc.data().kilometros,
          fotoPerfilUsuarioIntroducida: doc.data().fotoPerfilUsuarioIntroducida,
          iconoIntroducido: repeatOutline,
        });
        } else if(doc.data().tipoRuta == "rutaLineal") {
          this.rutas.push({
          id: doc.id,
          nombreRuta: doc.data().nombreRuta,
          infoRuta: doc.data().infoRuta,
          imagenesIntroducidas: doc.data().imagenesIntroducidas,
          usuario: doc.data().usuarioIntroducido,
          nivelUsuario: doc.data().nivelUsuarioIntroducido,
          tipoRuta: "Lineal",
          valoracion: doc.data().valoracion,
          tiempoPublicacionIntroducido: doc.data().tiempoPublicacionIntroducido,
          kilometros: doc.data().kilometros,
          fotoPerfilUsuarioIntroducida: doc.data().fotoPerfilUsuarioIntroducida,
          iconoIntroducido: resizeOutline,
        });
        } if(doc.data().tipoRuta == "ascension") {
          this.rutas.push({
          id: doc.id,
          nombreRuta: doc.data().nombreRuta,
          infoRuta: doc.data().infoRuta,
          imagenesIntroducidas: doc.data().imagenesIntroducidas,
          usuario: doc.data().usuarioIntroducido,
          nivelUsuario: doc.data().nivelUsuarioIntroducido,
          tipoRuta: "Ascension",
          valoracion: doc.data().valoracion,
          tiempoPublicacionIntroducido: doc.data().tiempoPublicacionIntroducido,
          kilometros: doc.data().kilometros,
          fotoPerfilUsuarioIntroducida: doc.data().fotoPerfilUsuarioIntroducida,
          iconoIntroducido: flagOutline,
        });
        }  
        
        console.log(doc.id, " => ", doc.data());
      });
      console.log(this.rutas);
    },
  },
  mounted() {
    this.obtenerRutasDisponibles();
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
