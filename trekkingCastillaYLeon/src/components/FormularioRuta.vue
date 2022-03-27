<template>
  <form @submit.prevent="guardarRuta">
    <ion-list>
      <ion-item>
        <ion-label position="floating"
          >Nombre de la ruta que vas a añadir</ion-label
        >
        <ion-input clear-input value="" type="text" v-model="nombreRuta"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating"
          >¿Dónde has realizado la ruta?</ion-label
        >
        <ion-input clear-input value="" type="text" v-model="infoRuta"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Categoría</ion-label>
        <ion-select
          interface="popover"
          placeholder="Selecciona la categoría de la ruta"
          v-model="tipoRuta"
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
        <ion-input clear-input value="" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Valoración</ion-label>
        <ion-select
          interface="popover"
          placeholder="Añade una valoración para esta ruta"
          v-model="valoracion"
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
} from "@ionic/vue";

import { resizeOutline, repeatOutline, flagOutline } from "ionicons/icons";
import { useStore } from "vuex";

export default defineComponent({
  name: "AnadirRuta",
  emits: ["anadirRuta"],
  components: {
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonList,
  },
  data() {
    return {
      nombreRuta: "",
      infoRuta: "",
      imagenes: "",
      usuario: "",
      nivelUsuario: "",
      tipoRuta: "",
      valoracion: "",
      tiempoPublicacion: "",
    };
  },
  methods: {
    guardarRuta() {
      const memoryData = {
        nombreRuta: this.nombreRuta,
        infoRuta: this.infoRuta,
        imagenes: this.imagenes,
        usuario: this.usuario,
        nivelUsuario: this.nivelUsuario,
        tipoRuta: this.tipoRuta,
        valoracion: this.valoracion,
        tiempoPublicacion: this.tiempoPublicacion,
      };
      this.$emit("anadirRuta", memoryData);
    },
  },
  setup() {
    const store = useStore();
    return {
      value: computed(() => store.state.count),
      anadirDatos: () => store.dispatch("anadirRuta"),
      resizeOutline,
      repeatOutline,
      flagOutline,
    };
  },
});
</script>