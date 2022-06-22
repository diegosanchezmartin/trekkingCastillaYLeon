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
              @ionChange = "obtenerNivelUsuario()"
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
              <ion-select-option value="1">1 estrella</ion-select-option>
              <ion-select-option value="2">2 estrellas</ion-select-option>
              <ion-select-option value="3">3 estrellas</ion-select-option>
              <ion-select-option value="4">4 estrellas</ion-select-option>
              <ion-select-option value="5">5 estrellas</ion-select-option>
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
        <ion-list>
          <ion-list-header>
            <ion-label
              >Progreso al siguiente nivel: {{ progreso * 100 }}%</ion-label
            >
          </ion-list-header>
          <ion-progress-bar :value=progreso></ion-progress-bar>
        </ion-list>
        <ion-button expand="block" fill="outline" color="dark" type="submit">
          Añadir ruta
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Camera, CameraResultType } from "@capacitor/camera";
import { defineComponent, reactive } from "vue";
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
  IonProgressBar,
} from "@ionic/vue";

import {
  addOutline,
  resizeOutline,
  repeatOutline,
  flagOutline,
} from "ionicons/icons";
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
    IonProgressBar,
  },
  data() {
    return {
      progreso: 0,
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
    const state = reactive({
      puntosUser: 0,
    });
    var images = [];
    var urlsFotos = [];
    var url = "";
    const user = auth.currentUser;
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      if (image?.base64String) {
        const guid = uuidv4();
        const filepath = `${user?.uid}/images/${guid}.${image.format}`;
        const storageRef = storage.ref();
        await storageRef
          .child(filepath)
          .putString(image.base64String, "base64");
        url = await storageRef.child(filepath).getDownloadURL();
        console.log(image);
        images.push(image);
        console.log(url);
        urlsFotos.push(url);
      }
    };
    async function obtenerNivelUsuario() {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          state.puntosUser = result.data().puntuacion;
          if (result.data().puntuacion <= 10) {
            if (this.tipoRutaIntroducido == "") {
              this.progreso = state.puntosUser / 10;
            } else if (
              this.tipoRutaIntroducido == "rutaLineal" ||
              this.tipoRutaIntroducido == "rutaCircular"
            ) {
              this.progreso = (state.puntosUser + 5) / 10;
            } else if (this.tipoRutaIntroducido == "ascension") {
              this.progreso = (state.puntosUser + 15) / 10;
            }
          } else if (
            result.data().puntuacion > 10 &&
            result.data().puntuacion <= 20
          ) {
            if (this.tipoRutaIntroducido == "") {
              this.progreso = (state.puntosUser - 10) / 10;
            } else if (
              this.tipoRutaIntroducido == "rutaLineal" ||
              this.tipoRutaIntroducido == "rutaCircular"
            ) {
              this.progreso = (state.puntosUser - 10 + 5) / 10;
            } else if (this.tipoRutaIntroducido == "ascension") {
              this.progreso = (state.puntosUser - 10 + 15) / 10;
            }
          } else if (
            result.data().puntuacion > 20 &&
            result.data().puntuacion <= 35
          ) {
            if (this.tipoRutaIntroducido == "") {
              this.progreso = (state.puntosUser - 20) / 15;
            } else if (
              this.tipoRutaIntroducido == "rutaLineal" ||
              this.tipoRutaIntroducido == "rutaCircular"
            ) {
              this.progreso = (state.puntosUser - 20 + 5) / 10;
            } else if (this.tipoRutaIntroducido == "ascension") {
              this.progreso = (state.puntosUser - 20 + 15) / 10;
            }
          } else if (
            result.data().puntuacion > 35 &&
            result.data().puntuacion <= 50
          ) {
            if (this.tipoRutaIntroducido == "") {
              this.progreso = (state.puntosUser - 35) / 15;
            } else if (
              this.tipoRutaIntroducido == "rutaLineal" ||
              this.tipoRutaIntroducido == "rutaCircular"
            ) {
              this.progreso = (state.puntosUser - 35 + 5) / 10;
            } else if (this.tipoRutaIntroducido == "ascension") {
              this.progreso = (state.puntosUser - 35 + 15) / 10;
            }
          } else if (
            result.data().puntuacion > 50 &&
            result.data().puntuacion <= 70
          ) {
            if (this.tipoRutaIntroducido == "") {
              this.progreso = (state.puntosUser - 50) / 20;
            } else if (
              this.tipoRutaIntroducido == "rutaLineal" ||
              this.tipoRutaIntroducido == "rutaCircular"
            ) {
              this.progreso = (state.puntosUser - 50 + 5) / 10;
            } else if (this.tipoRutaIntroducido == "ascension") {
              this.progreso = (state.puntosUser - 50 + 15) / 10;
            }
          } else if (result.data().puntuacion > 70) {
            this.progreso = 1;
          }
        });
    }
    async function guardarRuta() {
      const current = new Date();
      db.collection("rutas")
        .doc(this.nombreRutaIntroducido)
        .set({
          nombreRuta: this.nombreRutaIntroducido,
          infoRuta: this.infoRutaIntroducido,
          imagenesIntroducidas: urlsFotos,
          usuarioIntroducido: auth.currentUser.displayName,
          nivelUsuarioIntroducido: this.nivelUsuarioIntroducido,
          tipoRuta: this.tipoRutaIntroducido,
          valoracion: this.valoracionIntroducido,
          kilometros: this.kilometrosIntroducidos,
          fotoPerfilUsuarioIntroducida: this.fotoPerfilUsuarioIntroducida,
          iconoIntroducido: this.iconoIntroducido,
          emailUsuario: auth.currentUser.email,
          fechaPublicacion: `${current.getDate()}/${
            current.getMonth() + 1
          }/${current.getFullYear()}`,
        });

      if (
        this.tipoRutaIntroducido == "rutaCircular" ||
        this.tipoRutaIntroducido == "rutaLineal"
      ) {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            rutasAnadidas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(5),
          });
      } else if (this.tipoRutaIntroducido == "ascension") {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            rutasAnadidas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(15),
          });
      }

      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("rutasUsuario")
        .doc(this.nombreRutaIntroducido)
        .set({
          imagenesIntroducidas: urlsFotos,
        })
        .then(this.$emit("anadir-ruta"));
    }

    const { photos, takePhoto } = usePhotoGallery();
    return {
      urlsFotos,
      usernameApp,
      resizeOutline,
      addOutline,
      repeatOutline,
      flagOutline,
      takePhoto,
      photos,
      takePicture,
      guardarRuta,
      obtenerNivelUsuario,
    };
  },
  mounted() {
    this.obtenerNivelUsuario();
  },
});
</script>

<style scoped>
.ios-padding {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>