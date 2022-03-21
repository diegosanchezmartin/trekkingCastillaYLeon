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
          <ion-button>
            <ion-icon :icon="addCircleOutline" />
          </ion-button>
          <ion-toolbar>
            <ion-title size="large">Explora</ion-title>
          </ion-toolbar>
          <ion-button>
            <ion-icon :icon="searchOutline" />
          </ion-button>
        </ion-item>
      </ion-header>

      <ion-list>
        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-label>
                <h1>Ascensión al Pico de la Aquiana</h1>
                <h2>
                  Campo de las Danzas 14,18kms +15ptos
                  <ion-icon :icon="starOutline" />4,8
                </h2>
              </ion-label>
            </ion-item>
          </ion-card-header>
          <ion-slides pager="true" :options="slideOpts">
            <ion-slide>
              <img src="../pictures/IMG_0955.jpg" />
            </ion-slide>
            <ion-slide>
              <img src="../pictures/IMG_0695.jpg" />
            </ion-slide>
            <ion-slide>
              <img src="../pictures/IMG_0785.jpg" />
            </ion-slide>
          </ion-slides>
          <ion-card-content>
            <ion-item>
              <ion-avatar >
                <img src="../pictures/FotoPerfil2.jpg" />
              </ion-avatar>
              <ion-label>
                <h1>Martín Fernández Maroto</h1>
                <h2>Pateador de campeonato +2125ptos</h2>
                <h3>
                  231 rutas realizadas, 87 rutas añadida, 45 rutas modificadas
                </h3>
              </ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-label>
                <h1>Ruta de las fuentes medicinales</h1>
                <h2>
                  Noceda del Bierzo 11,23kms +5ptos 4,3<ion-icon
                    :icon="starOutline"
                  />
                </h2>
              </ion-label>
            </ion-item>
          </ion-card-header>
          <ion-card-content>
              <img src="../pictures/IMG_1239.jpg" />
          
              <ion-avatar slot="start">
                <img src="../pictures/FotoPerfil1.jpg" />
              </ion-avatar>
              <ion-label>
                <h1>Diego Sánchez Martín</h1>
                <h2>Novato +10pts</h2>
                <h3>2 rutas realizadas, 1 ruta añadida, 0 rutas modificadas</h3>
              </ion-label>
            </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-label>
                <h1>Senda los Romeros</h1>
                <h2>
                  Peón de Arriba 7,89kms +10ptos 4,5<ion-icon
                    :icon="starOutline"
                  />
                </h2>
              </ion-label>
            </ion-item>
          </ion-card-header>
          <ion-card-content>
              <img src="../pictures/IMG_0833.jpg" />
          </ion-card-content>
          <ion-card-content>
            <ion-item>
              <ion-avatar slot="start">
                <img src="../pictures/FotoPerfil3.jpg" />
              </ion-avatar>
              <ion-label>
                <h1>Pedro Ramiro Fernández López</h1>
                <h2>Rutero experimentado +645pts</h2>
                <h3>
                  63 rutas realizadas, 12 ruta añadida, 3 rutas modificadas
                </h3>
              </ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
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
  IonSlide
} from "@ionic/vue";
import { starOutline, addCircleOutline, searchOutline } from "ionicons/icons";

export default defineComponent({
  name: "Tab1Page",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSlides, IonSlide },
  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
      
    };
    return {
      starOutline,
      addCircleOutline,
      searchOutline,
      slideOpts
    };
  },
});
</script>

<style scoped>
.swiper-pagination-bullet {
  background: black;
  opacity: 0.4;
}
</style>
