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
              <ion-avatar slot="end">
                <img src="../pictures/FotoPerfil2.jpg" />
              </ion-avatar>
              <ion-text color="dark">
                <h1>Martín Fernández Maroto</h1>
                <h2>Pateador de campeonato</h2>
              </ion-text>
              <ion-text color="medium"> </ion-text>
            </ion-item>
          </ion-card-content>
          <ion-footer>
            <ion-row>
              <ion-col center text-center>
                <button>
                  <div>Circular</div>
                   <ion-icon
                    :icon="repeatOutline"
                  ></ion-icon>
                </button>
              </ion-col>
              <ion-col center text-center>
                <button>
                  <div><ion-icon
                    :icon="starOutline"
                  /> 4,8</div>
                </button>
              </ion-col>
              <ion-col center text-center>
                <button>
                  <div>hace 6 horas</div>
                </button>
              </ion-col>
            </ion-row>
          </ion-footer>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-item>
              <ion-label>
                <h1>Ruta de las fuentes medicinales</h1>
                <h2>
                  Noceda del Bierzo 11,23kms +5ptos
                </h2>
              </ion-label>
            </ion-item>
          </ion-card-header>
          <ion-slides pager="true" :options="slideOpts">
            <ion-slide>
              <img src="../pictures/IMG_0797.jpg" />
            </ion-slide>
            <ion-slide>
              <img src="../pictures/IMG_1303.jpg" />
            </ion-slide>
            <ion-slide>
              <img src="../pictures/IMG_0833.jpg" />
            </ion-slide>
          </ion-slides>
          <ion-card-content>
            <ion-item>
              <ion-avatar slot="end">
                <img src="../pictures/FotoPerfil1.jpg" />
              </ion-avatar>
              <ion-text color="dark">
                <h1>Diego Sánchez Martín</h1>
                <h2>Novato</h2>
              </ion-text>
              <ion-text color="medium"> </ion-text>
            </ion-item>
          </ion-card-content>
          <ion-footer>
            <ion-row>
              <ion-col center text-center>
                <button>
                  <div>Lineal</div>
                   <ion-icon
                    :icon="resizeOutline"
                  ></ion-icon>
                </button>
              </ion-col>
              <ion-col center text-center>
                <button>
                  <div><ion-icon
                    :icon="starOutline"
                  /> 4,3</div>
                </button>
              </ion-col>
              <ion-col center text-center>
                <button>
                  <div><ion-icon
                    :icon="timeOutline"
                  /> hace 3 horas</div>
                </button>
              </ion-col>
            </ion-row>
          </ion-footer>
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
  IonSlide,
} from "@ionic/vue";
import { starOutline, timeOutline, resizeOutline, repeatOutline, analyticsOutline, addCircleOutline, searchOutline } from "ionicons/icons";

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
  },
  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
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
