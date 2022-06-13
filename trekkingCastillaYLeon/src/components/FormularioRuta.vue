<template>
  <ion-page>
    <ion-header> </ion-header>
    <ion-content :fullscreen="true">
      <form class="ios-padding" @submit.prevent="guardarRuta">
        <ion-list>
          <ion-item>
            <ion-label position="floating"
              >Nombre de la ruta que vas a añadir</ion-label
            >
            <ion-input
              ref="nombreRuta"
              clear-input
              value=""
              type="text"
              required
              v-model="nombreRutaIntroducido"
            ></ion-input>
          </ion-item>
          <ion-item> 
            <ion-label position="floating"
              >¿Dónde has realizado la ruta?</ion-label
            >
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
            <ion-fab horizontal="end">
              <ion-fab-button size="small" color="dark" @click="takePicture">
                <ion-icon :icon="addOutline" />
              </ion-fab-button>
            </ion-fab>
            <ion-grid>
              <ion-row>
                <ion-col size="6" :key="photo" v-for="photo in urlsFotos">
                  <ion-img :src="photo"></ion-img>
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
              <ion-select-option value="rutaLineal"
                >Ruta líneal
              </ion-select-option>
              <ion-select-option value="rutaCircular"
                >Ruta Circular
              </ion-select-option>
              <ion-select-option value="ascension"
                >Ascensión
              </ion-select-option>
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
              <ion-select-option value="1"
                >1 estrella</ion-select-option
              >
              <ion-select-option value="2"
                >2 estrellas</ion-select-option
              >
              <ion-select-option value="3"
                >3 estrellas</ion-select-option
              >
              <ion-select-option value="4"
                >4 estrellas</ion-select-option
              >
              <ion-select-option value="5"
                >5 estrellas</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating"
              >Recomendaciones {{ value }}</ion-label
            >
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { defineComponent, computed, ref } from "vue";
import { usernameApp } from "@/views/HacerAutenticacion.vue";
import {
  IonContent,
  IonHeader,
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
  IonImg,
  IonCol,
  IonRow,
  IonGrid,
  IonPage,
} from "@ionic/vue";

import {
  addOutline,
  resizeOutline,
  repeatOutline,
  flagOutline,
} from "ionicons/icons";
import { useStore } from "vuex";
import { usePhotoGallery, UserPhoto } from "../camera/usePhotoGallery";
import { storage, auth, db } from "../main";
import firebase from "firebase/compat/app";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "AnadirRuta",
  emits: ["anadir-ruta"],
  components: {
    IonContent,
    IonHeader,
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
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonPage,
  },
  data() {
    return {
      nombreRutaIntroducido: "",
      infoRutaIntroducido: "",
      imagenesIntroducidas: "",
      usuarioIntroducido: "",
      nivelUsuarioIntroducido: "novato",
      tipoRutaIntroducido: "",
      valoracionIntroducido: "",
      kilometrosIntroducidos: "",
      fotoPerfilUsuarioIntroducida: "",
      iconoIntroducido: "",
    };
  },
  setup() {
    var images = [];
    var urlsFotos = [];
    var url = '';
    const user = auth.currentUser;
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
      if(image?.base64String) {
        const guid = uuidv4();
        const filepath = `${user?.uid}/images/${guid}.${image.format}`;
        const storageRef = storage.ref();
        await storageRef.child(filepath).putString(image.base64String, 'base64');
        url = await storageRef.child(filepath).getDownloadURL();
        console.log(image);
        images.push(image);
        console.log(url);
        urlsFotos.push(url);
      }
    }
    async function guardarRuta() {
      const current = new Date();
      db.collection("rutas").doc(this.nombreRutaIntroducido).set({
        nombreRuta: this.nombreRutaIntroducido,
        infoRuta: this.infoRutaIntroducido,
        //imagenesIntroducidas: this.photos,
        imagenesIntroducidas: urlsFotos,
        usuarioIntroducido: auth.currentUser.displayName,
        nivelUsuarioIntroducido: this.nivelUsuarioIntroducido,
        tipoRuta: this.tipoRutaIntroducido,
        valoracion: this.valoracionIntroducido,
        kilometros: this.kilometrosIntroducidos,
        fotoPerfilUsuarioIntroducida: this.fotoPerfilUsuarioIntroducida,
        iconoIntroducido: this.iconoIntroducido,
        fechaPublicacion: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
      });

      db.collection("users").doc(auth.currentUser.uid).update(
        {rutasAnadidas: firebase.firestore.FieldValue.increment(1)}
      )

      db.collection("users").doc(auth.currentUser.uid).collection("rutasUsuario").doc(this.nombreRutaIntroducido).set({
        imagenesIntroducidas: urlsFotos,
      }).then(
        this.$emit("anadir-ruta")
      )

      /*urlsFotos.forEach(async urlFoto => {
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("images")
          .add({
            image: urlFoto,
          })
      });*/ 
    }

    const { photos, takePhoto } = usePhotoGallery();
    const store = useStore();
    return {
      urlsFotos,
      usernameApp,
      value: computed(() => store.state.count),
      anadirDatos: () => store.dispatch("anadirRuta"),
      resizeOutline,
      addOutline,
      repeatOutline,
      flagOutline,
      takePhoto,
      photos,
      takePicture,
      guardarRuta,
    };
  },
});
</script>