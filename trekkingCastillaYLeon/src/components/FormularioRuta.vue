<template>
  <form class="ios-padding" @submit.prevent="guardarRuta">
    <ion-list>
      <ion-item>
        <ion-label position="floating"
          >Nombre de la ruta que vas a añadir</ion-label
        >
        <ion-input
          clear-input
          value=""
          type="text"
          required
          v-model="nombreRutaIntroducido"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">¿Dónde has realizado la ruta?</ion-label>
        <ion-input
          clear-input
          value=""
          type="text"
          required
          v-model="infoRutaIntroducido"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Añade fotos de la ruta</ion-label>
        <ion-fab horizontal="end" >
          <ion-fab-button size="small" color="dark" @click="takePhoto()">
            <ion-icon :icon="addOutline" />
          </ion-fab-button>
        </ion-fab>
        <ion-grid>
          <ion-row>
            <ion-col size="6" :key="photo" v-for="photo in photos">
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Categoría</ion-label>
        <ion-select
          interface="popover"
          placeholder="Selecciona la categoría de la ruta"
          required
          v-model="tipoRutaIntroducido"
        >
          <ion-select-option value="rutaLineal">Ruta líneal </ion-select-option>
          <ion-select-option value="rutaCircular"
            >Ruta Circular
          </ion-select-option>
          <ion-select-option value="ascension">Ascensión </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Dificultad</ion-label>
        <ion-select
          interface="popover"
          placeholder="Selecciona la dificultad de la ruta"
        >
          <ion-select-option value="facil">Fácil</ion-select-option>
          <ion-select-option value="media">Media</ion-select-option>
          <ion-select-option value="dificil">Difícil</ion-select-option>
          <ion-select-option value="extrema">Extrema</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating"
          >Introduce cuántos kilómetros has recorrido</ion-label
        >
        <ion-input
          clear-input
          value=""
          type="text"
          v-model="kilometrosIntroducidos"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Valoración</ion-label>
        <ion-select
          interface="popover"
          placeholder="Añade una valoración para esta ruta"
          required
          v-model="valoracionIntroducido"
        >
          <ion-select-option value="1estrella">1 estrella</ion-select-option>
          <ion-select-option value="2estrellas">2 estrellas</ion-select-option>
          <ion-select-option value="3estrellas">3 estrellas</ion-select-option>
          <ion-select-option value="4estrellas">4 estrellas</ion-select-option>
          <ion-select-option value="5estrellas">5 estrellas</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Recomendaciones {{ value }}</ion-label>
        <ion-select
          interface="popover"
          multiple="true"
          placeholder="¿Quieres añadir alguna recomendación?"
        >
          <ion-select-option value="Gorra">Gorra</ion-select-option>
          <ion-select-option value="RaquetasNieve"
            >Raquetas de nieve</ion-select-option
          >
          <ion-select-option value="Agua">Agua</ion-select-option>
          <ion-select-option value="Palos">Palos</ion-select-option>
          <ion-select-option value="Brújula">Brújula</ion-select-option>
          <ion-select-option value="Ropa">Ropa térmica</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-button expand="block" fill="outline" color="dark" type="submit">
      Añadir ruta
    </ion-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonList,
  IonInput,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/vue";

import {
  addOutline,
  resizeOutline,
  repeatOutline,
  flagOutline,
} from "ionicons/icons";
import { useStore } from "vuex";
import { storage } from "../main";
import { usePhotoGallery, UserPhoto } from "../camera/usePhotoGallery";

export default defineComponent({
  name: "AnadirRuta",
  emits: ["anadir-ruta"],
  components: {
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonList,
    IonInput,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  },
  data() {
    return {
      nombreRutaIntroducido: "",
      infoRutaIntroducido: "",
      imagenesIntroducidas: "",
      usuarioIntroducido: "desconocido",
      nivelUsuarioIntroducido: "",
      tipoRutaIntroducido: "",
      valoracionIntroducido: "",
      tiempoPublicacionIntroducido: "",
      kilometrosIntroducidos: "",
      fotoPerfilUsuarioIntroducida: "",
      iconoIntroducido: "",
    };
  },
  methods: {
    guardarRuta() {
      const memoryData = {
        nombreRuta: this.nombreRutaIntroducido,
        infoRuta: this.infoRutaIntroducido,
        imagenesIntroducido: this.imagenesIntroducidas,
        usuarioIntroducido: this.usuarioIntroducido,
        nivelUsuarioIntroducido: this.nivelUsuarioIntroducido,
        tipoRuta: this.tipoRutaIntroducido,
        valoracion: this.valoracionIntroducido,
        tiempoPublicacionIntroducido: this.timepoPublicacionIntroducido,
        kilometros: this.kilometrosIntroducidos,
        fotoPerfilUsuarioIntroducida: this.fotoPerfilUsuarioIntroducida,
        iconoIntroducido: this.iconoIntroducido,
      };
      this.$emit("anadir-ruta", memoryData);
    },
  },
  setup() {
    const { photos, takePhoto } = usePhotoGallery();
    const store = useStore();
    return {
      value: computed(() => store.state.count),
      anadirDatos: () => store.dispatch("anadirRuta"),
      resizeOutline,
      addOutline,
      repeatOutline,
      flagOutline,
      takePhoto,
      photos,
    };
  },
});
</script>