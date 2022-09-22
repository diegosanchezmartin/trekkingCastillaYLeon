<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Recorta tu foto:</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <cropper
        :stencil-props="{
          aspectRatio: 1 / 1,
        }"
        :src="image"
        ref="cropper"
      />
    </ion-item>
    <ion-button expand="block" color="medium" @click="recortar()">
      Recortar
    </ion-button>
    <ion-row class="fila">
      <ion-label class="resultado" v-if="value !== null"
        >Este es el resultado:</ion-label
      >
    </ion-row>
    <ion-img v-if="value !== null" :src="value"> </ion-img>
    <ion-button v-if="value !== null" expand="block" color="dark" @click="confirm"
      >Confirmar</ion-button
    >
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonImg,
  IonLabel,
  modalController,
  IonRow,
} from "@ionic/vue";
import { defineComponent, reactive, toRefs } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  name: "ModalComponent",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    Cropper,
    IonImg,
    IonLabel,
    IonRow,
  },
  props: {
    image: String,
  },
  setup() {
    const imageCropped = reactive({
      value: null,
    });
    async function recortar() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      //Recorto la imagen del canvas y la convierto en un archivo jpeg y le gestiono la calidad con un número entre 0 y 1
      imageCropped.value = canvas.toDataURL('image/jpeg', 0.5);
    }
    return {
      ...toRefs(imageCropped),
      recortar,
    };
  },
  methods: {
      confirm() {
        return modalController.dismiss(this.value, 'confirm');
      },
    },
});
</script>

<style scoped>
.fila{
    padding: 8% 0% 0% 0%;
}
.resultado {
  text-align: center;
  font-size: x-large;
  width: 100%
}
</style>