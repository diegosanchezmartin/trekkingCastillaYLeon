<template>
  <ion-page>
    <ion-header>
      <ion-title></ion-title>
    </ion-header>
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
              v-model="localizacionRuta"
            ></ion-input>
          </ion-item>
          <ion-item class="itemFotos">
            <ion-grid>
              <ion-col>
                <ion-row>
                  <ion-label class="itemFilaFotos"
                    >Añade fotos de la ruta</ion-label
                  >
                </ion-row>
                <ion-row>
                  <ion-item class="itemFilaFotos">
                    <ion-fab horizontal="center">
                      <ion-fab-button
                        size="small"
                        color="dark"
                        @click="takePicture"
                      >
                        <ion-icon :icon="addOutline" />
                      </ion-fab-button>
                    </ion-fab>
                  </ion-item>
                </ion-row>
                <ion-row>
                  <ion-grid>
                    <ion-row size="2">
                      <ion-col
                        size="2"
                        v-for="imagen in urlsFotos"
                        v-bind:key="imagen"
                      >
                        <ion-img :src="imagen" />
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-row>
              </ion-col>
            </ion-grid>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Categoría</ion-label>
            <ion-select
              interface="popover"
              placeholder="Selecciona la categoría de la ruta"
              required
              v-model="tipoRutaIntroducido"
              @ionChange="obtenerNivelUsuario()"
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
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label class="progreso"
              >Progreso al siguiente nivel: {{ progreso * 100 }}%</ion-label
            >
          </ion-list-header>
          <ion-progress-bar :value="progreso"></ion-progress-bar>
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
  IonCol,
  IonRow,
  IonGrid,
  IonPage,
  IonProgressBar,
  modalController,
  IonListHeader,
  IonImg,
  IonTitle,
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
import Modal from "./Modal.vue";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "AnadirRuta",
  //Andir ruta
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
    IonCol,
    IonRow,
    IonGrid,
    IonPage,
    IonProgressBar,
    IonListHeader,
    IonImg,
    IonTitle,
  },
  data() {
    return {
      progreso: 0,
      nombreRutaIntroducido: "",
      localizacionRuta: "",
      imagenesIntroducidas: "",
      usuarioIntroducido: "",
      tipoRutaIntroducido: "",
      valoracionIntroducido: "",
      kilometrosIntroducidos: "",
    };
  },
  setup() {
    const state = reactive({
      puntosUser: 0,
    });
    const urlsFotos: Array<string> = reactive([]);
    const user = auth.currentUser;
    const openModal = async (imagenURL) => {
      const modal = await modalController.create({
        component: Modal,
        componentProps: {
          image: imagenURL,
        },
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (role === "confirm") {
        const guid = uuidv4();
        const storageRef = storage.ref();
        const block = data.split(";");
        const contentType = block[0].split(":")[1];
        const realData = block[1].split(",")[1];
        const filepath = `${user?.uid}/images/${guid}.${contentType}`;
        console.log(realData);
        await storageRef
          .child(filepath)
          .putString(realData, "base64")
          .then((snapshot) => {
            storageRef
              .child(filepath)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                urlsFotos.push(url);
              });
          });
      }
    };
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
        console.log(image.base64String);
        await storageRef
          .child(filepath)
          .putString(image.base64String, "base64")
          .then((snapshot) => {
            storageRef
              .child(filepath)
              .getDownloadURL()
              .then((url) => {
                openModal(url);
              });
          });
      }
    };
    async function obtenerNivelUsuario() {
      await db
        .collection("users")
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
      await db
        .collection("rutas")
        .doc(this.nombreRutaIntroducido)
        .set({
          nombreRuta: this.nombreRutaIntroducido,
          localizacion: this.localizacionRuta,
          imagenesIntroducidas: urlsFotos,
          usuarioIntroducido: auth.currentUser.displayName,
          tipoRuta: this.tipoRutaIntroducido,
          valoracion: this.valoracionIntroducido,
          kilometros: this.kilometrosIntroducidos,
          emailUsuario: auth.currentUser.email,
          fechaPublicacion: `${current.getDate()}/${
            current.getMonth() + 1
          }/${current.getFullYear()}`,
        });

      if (
        this.tipoRutaIntroducido == "rutaCircular" ||
        this.tipoRutaIntroducido == "rutaLineal"
      ) {
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .update({
            rutasAnadidas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(5),
          });
      } else if (this.tipoRutaIntroducido == "ascension") {
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .update({
            rutasAnadidas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(15),
          });
      }

      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("rutasUsuario")
        .doc(this.nombreRutaIntroducido)
        .set({
          estadoRuta: "anadida",
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
    this.progreso = 0;
    this.nombreRutaIntroducido = "";
    this.localizacionRuta = "";
    this.imagenesIntroducidas = "";
    this.usuarioIntroducido = "";
    this.tipoRutaIntroducido = "";
    this.valoracionIntroducido = "";
    this.kilometrosIntroducidos = "";
    this.obtenerNivelUsuario();
  },
});
</script>

<style scoped>
.progreso {
  margin-top: 0px;
}
.itemFotos {
  display: flex;
}
.itemFilaFotos {
  width: 100%;
  text-align: center;
  padding: 0% 0% 4% 0%;
}
.ios-padding {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>