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
                  <h1>{{ ruta.nombreRuta }}</h1>
                  <h2>{{ ruta.infoRuta }} {{ ruta.kilometros }}</h2>
                </ion-label>
              </ion-item>
            </ion-card-header>
            <ion-slides pager="true" :options="slideOpts">
              <ion-slide v-for="(imagen, index) in ruta.imagenes" v-bind:key="index" >
                <img :src="imagen" />
              </ion-slide>
            </ion-slides>
            <ion-card-content>
              <ion-item>
                <ion-avatar slot="end">
                  <img :src=ruta.fotoPerfilUsuario />
                </ion-avatar>
                <ion-text color="dark">
                  <h1>{{ ruta.usuario }}</h1>
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
                      <ion-icon :icon=ruta.icono></ion-icon>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSlides,
  IonSlide,
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
} from "@ionic/vue";
import {
  starOutline,
  timeOutline,
  resizeOutline,
  repeatOutline,
  analyticsOutline,
  addCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
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
  },
  computed: {
    rutas() {
      return this.$store.getters.rutas;
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
      analyticsOutline,
      addCircleOutline,
      searchOutline,
      slideOpts,
      goAddRoute,
    };
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
