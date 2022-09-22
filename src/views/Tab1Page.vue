<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="cargando">
      <ion-grid class="grid">
        <ion-row class="row">
          <ion-col class="col">
            <IconoSVGBlanco />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-header collapse="condense">
        <ion-item>
          <ion-button @click="goAddRoute()" color="medium">
            <ion-icon :icon="addCircleOutline" />
          </ion-button>
          <ion-toolbar>
            <ion-title size="large">Explora</ion-title>
          </ion-toolbar>
          <ion-searchbar animated></ion-searchbar>
        </ion-item>
      </ion-header>
      <ion-list class="listaRutas">
        <ion-item v-for="ruta in rutas" v-bind:key="ruta.id">
          <ion-card class="ruta">
            <ion-card-header>
              <ion-item>
                <ion-label>
                  <h4>{{ ruta.nombreRuta }}</h4>
                  <h3>
                    <ion-icon :icon="locationOutline" />
                    {{ ruta.localizacion }} {{ ruta.kilometros }} Kms
                  </h3>
                </ion-label>
                <ion-button
                  v-if="ruta.usuario !== nombreUsuario"
                  color="danger"
                  @click="denunciarRuta()"
                >
                  <ion-icon :icon="alertOutline" />
                </ion-button>
                <ion-button
                  v-else
                  color="danger"
                  @click="borrarRuta(ruta.nombreRuta, ruta.tipoRuta)"
                >
                  <ion-icon :icon="closeOutline" />
                </ion-button>
              </ion-item>
            </ion-card-header>
            <ion-grid>
              <ion-row>
                <swiper
                  :modules="modules"
                  pager="true"
                  :options="slideOpts"
                  navigation
                  :pagination="{ clickable: true }"
                >
                  <swiper-slide
                    v-for="(photo, index) in ruta.imagenesIntroducidas"
                    :key="index"
                  >
                    <ion-img :src="photo" />
                  </swiper-slide>
                </swiper>
              </ion-row>
              <ion-row>
                <ion-col
                  v-if="ruta.usuario !== nombreUsuario"
                  class="columnaComentarios"
                >
                  <ion-button
                    class="botonComentarios"
                    color="success"
                    @click="
                      rutaRealizada(ruta.imagenesIntroducidas, ruta.tipoRuta)
                    "
                    ><ion-icon :icon="checkmarkDoneSharp"
                  /></ion-button>
                </ion-col>
                <ion-col v-else class="columnaComentarios">
                  <ion-button
                    class="botonComentarios"
                    color="warning"
                    @click="modificarRuta(ruta)"
                    ><ion-icon :icon="pencilSharp"
                  /></ion-button>
                </ion-col>
                <ion-col class="columnaComentarios">
                  <ion-button
                    class="botonComentarios"
                    color="medium"
                    @click="setOpen(true, ruta.nombreRuta)"
                    ><ion-icon :icon="chatbubbles"
                  /></ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-modal :is-open="modificandoRuta">
              <ion-header>
                <ion-toolbar>
                  <ion-title>Ruta</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="setOpenModalModificar()"
                      >Cerrar</ion-button
                    >
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <p>Selecciona la opción que quieres modificar:</p>
                <ion-list>
                  <ion-item
                    v-for="opcion in opciones"
                    v-bind:key="opcion.nombre"
                  >
                    <ion-label>{{ opcion }}</ion-label>
                    <ion-icon
                      slot="end"
                      :icon="chevronForwardOutline"
                      @click="modificarCampos(opcion)"
                    ></ion-icon>
                  </ion-item>
                </ion-list>
              </ion-content>
            </ion-modal>
            <ion-card-content class="cardContent">
              <ion-item @click="irPerfilUsuario(ruta.emailRuta)">
                <ion-avatar slot="end">
                  <img :src="ruta.fotoPerfilUsuarioIntroducida" />
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
                      {{ ruta.valoracion }} <ion-icon :icon="starOutline" />
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="timeOutline" />
                      {{ ruta.fechaPublicacion }}
                    </div>
                  </button>
                </ion-col>
              </ion-row>
            </ion-footer>
          </ion-card>
          <ion-modal
            :is-open="isOpen"
            ref="modal"
            :initial-breakpoint="0.35"
            :breakpoints="[0.25, 0.5, 0.75, 1]"
          >
            <ion-header>
              <ion-toolbar>
                <ion-title>Comentarios</ion-title>
                <ion-buttons slot="end">
                  <ion-button color="light" @click="setOpen(false, null)"
                    >Cerrar</ion-button
                  >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <ion-item class="itemComentario">
                <ion-label position="floating">Añade tu comentario</ion-label>
                <ion-input
                  clear-input
                  type="text"
                  v-model="comentarioIntroducido"
                ></ion-input
                ><ion-icon
                  :icon="arrowDownCircleOutline"
                  slot="end"
                  @click="anadirComentario()"
                />
              </ion-item>
              <ion-list class="list">
                <ion-item
                  v-for="comentario in comentariosMostrados"
                  v-bind:key="comentario.id"
                  class="item"
                  @click="
                    opcionesComentario(
                      comentario.id,
                      comentario.emailCreador,
                      comentario.comentario
                    )
                  "
                >
                  <ion-avatar class="avatar" slot="start">
                    <ion-img :src="comentario.fotoPerfilUsuario"></ion-img>
                  </ion-avatar>
                  <ion-label>
                    <h5>
                      {{ comentario.creador }}: {{ comentario.comentario }}
                    </h5>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-modal>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ModalMensaje from "/src/components/ModalMensaje.vue";
import { db, auth } from "@/main";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
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
  IonSearchbar,
  IonGrid,
  IonModal,
  IonInput,
  alertController,
  actionSheetController,
  modalController,
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
  locationOutline,
  checkmarkDoneSharp,
  chatbubbles,
  arrowDownCircleOutline,
  alertOutline,
  closeOutline,
  chevronForwardOutline,
  pencilSharp,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
import iconoSVGBlanco from "../components/IconoSVGBlanco.vue";
import iconoSVGNegro from "../components/IconoSVGNegro.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@ionic/vue/css/ionic-swiper.css";
import IconoSVGBlanco from "../components/IconoSVGBlanco.vue";
import firebase from "firebase/compat/app";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "Tab1Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonButtons,
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
    iconoSVGBlanco,
    IonSearchbar,
    IonGrid,
    IonModal,
    IonInput,
    IconoSVGBlanco,
  },
  data() {
    return {
      cargando: false,
      isOpen: false,
      darkMode: false,
      comentarioIntroducido: "",
      nombreRuta2: "",
      comentariosMostrados: [],
      nombreUsuario: auth.currentUser.displayName,
      opciones: [],
      modificandoRuta: false,
      nombreRutaModificada: "",
    };
  },
  methods: {
    async openModal(nombreRuta: string, mensaje: string, id: string) {
      const modal = await modalController.create({
        component: ModalMensaje,
        componentProps: {
          mensaje: mensaje,
        },
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        await db
          .collection("rutas")
          .get()
          .then(async (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              console.log(doc.id);
              await db
                .collection("rutas")
                .doc(doc.id)
                .collection("comentarios")
                .get()
                .then((querySnapshot2) => {
                  querySnapshot2.forEach(async (doc2) => {
                    if (doc2.id == id) {
                      await db
                        .collection("rutas")
                        .doc(doc.id)
                        .collection("comentarios")
                        .doc(doc2.id)
                        .update({ comentario: data });

                      for (var comentario of this.comentariosMostrados) {
                        if (comentario.comentario == mensaje) {
                          comentario.comentario = data;
                        }
                      }
                    }
                  });
                });
            });
          });
      }
    },
    async setOpenModalModificar() {
      this.modificandoRuta = !this.modificandoRuta;
    },
    async presentActionSheetBorrar(
      id: number,
      mensaje: string,
      nombreRuta: string
    ) {
      const actionSheet = await actionSheetController.create({
        header: "Comentario",
        buttons: [
          {
            text: "Borrar",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              console.log("Borrar comentario clickado");
            },
          },
          {
            text: "Editar",
            role: "edit",
            handler: () => {
              console.log("Editar clickado");
              this.openModal(nombreRuta, mensaje, id);
            },
          },
          {
            text: "Cancelar",
            handler: () => {
              console.log("Cancelar clickado");
            },
          },
        ],
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();

      if (role == "destructive") {
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("mensajes")
          .doc(this.emailUsuario)
          .collection("conversacion")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (doc.data().id == id) {
                this.uidMensajeABorrar = doc.id;
              }
            });
          });

        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("mensajes")
          .doc(this.emailUsuario)
          .collection("conversacion")
          .doc(this.uidMensajeABorrar)
          .delete();

        this.$router.go();
      } else if (role == "edit") {
        this.editarMensaje = true;
      }
    },
    async modificarCampos(opcion: string) {
      const cambio = opcion.split(":")[0];
      if (cambio === "Tipo de ruta") {
        const opcionSeleccionada = opcion.split(":")[1];
        console.log(opcionSeleccionada);
        if (opcionSeleccionada === " Lineal") {
          const actionSheet = await actionSheetController.create({
            header: "Selecciona la nueva categoria: ",
            buttons: [
              {
                text: "Circular",
                handler: async () => {
                  console.log("Circular clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "rutaCircular" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
              {
                text: "Ascensión",
                handler: async () => {
                  console.log("Ascensión clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "ascension" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      puntuacion: firebase.firestore.FieldValue.increment(10),
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
            ],
          });
          await actionSheet.present();
        } else if (opcionSeleccionada === " Circular") {
          const actionSheet = await actionSheetController.create({
            header: "Selecciona la nueva categoria: ",
            buttons: [
              {
                text: "Lineal",
                handler: async () => {
                  console.log("Lineal clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "rutaLineal" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      puntuacion: firebase.firestore.FieldValue.increment(10),
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
              {
                text: "Ascensión",
                handler: async () => {
                  console.log("Ascensión clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "ascension" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      puntuacion: firebase.firestore.FieldValue.increment(10),
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
            ],
          });
          await actionSheet.present();
        } else {
          const actionSheet = await actionSheetController.create({
            header: "Selecciona la nueva categoria: ",
            buttons: [
              {
                text: "Circular",
                handler: async () => {
                  console.log("Circular clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "rutaCircular" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      puntuacion: firebase.firestore.FieldValue.increment(-10),
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
              {
                text: "Lineal",
                handler: async () => {
                  console.log("Lineal clickado");
                  this.modificandoRuta = !this.modificandoRuta;
                  await db
                    .collection("rutas")
                    .doc(this.nombreRutaModificada)
                    .update({ tipoRuta: "rutaLineal" });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .update({
                      puntuacion: firebase.firestore.FieldValue.increment(-10),
                      rutasModificadas:
                        firebase.firestore.FieldValue.increment(1),
                    });
                  await db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("rutasUsuario")
                    .doc(this.nombreRutaModificada)
                    .update({ estadoRuta: "modificada" });
                  this.rutas = [];
                  this.obtenerRutasDisponibles();
                },
              },
            ],
          });
          await actionSheet.present();
        }
      }
    },
    async presentActionSheetDenunciar(id: number) {
      const actionSheet = await actionSheetController.create({
        header: "Comentario",
        buttons: [
          {
            text: "Denunciar",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              console.log("Denunciar comentario clickado");
            },
          },
          {
            text: "Cancelar",
            handler: () => {
              console.log("Cancelar clickado");
            },
          },
        ],
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
    },
    setOpen(isOpen: boolean, nombreRuta: string) {
      this.nombreRuta = nombreRuta;
      this.rutas.forEach((ruta) => {
        if (ruta.nombreRuta === nombreRuta) {
          this.comentariosMostrados = ruta.comentarios;
        }
      });
      this.isOpen = isOpen;

      if (isOpen == false) {
        this.comentariosMostrados = [];
      }

      console.log(this.nombreRuta);
      console.log(this.comentariosMostrados);
    },
    async denunciarRuta() {
      const alerta = await alertController.create({
        header: "Estás seguro de que quieres denunciar esta ruta?",
        buttons: [
          {
            text: "Si",
            role: "confirmar",
            handler: () => {
              this.handlerMessage = "Denuncia confirmada";
            },
          },
          {
            text: "No",
            role: "cancelar",
            handler: () => {
              this.handlerMessage = "Denuncia cancelada";
            },
          },
        ],
      });

      await alerta.present();

      const { role } = await alerta.onDidDismiss();
      this.roleMessage = `Confirmado con respuesta: ${role}`;
    },
    async borrarRuta(nombreRuta: string, tipoRuta: string) {
      const alerta = await alertController.create({
        header: "Estás seguro de que quieres borrar esta ruta?",
        buttons: [
          {
            text: "Si",
            role: "confirmar",
            handler: () => {
              this.handlerMessage = "Ruta Borrada";
            },
          },
          {
            text: "No",
            role: "cancelar",
            handler: () => {
              this.handlerMessage = "Ruta conservada";
            },
          },
        ],
      });

      await alerta.present();

      const { role } = await alerta.onDidDismiss();
      if (role == "confirmar") {
        console.log("Ruta borrada");
        await db.collection("rutas").doc(nombreRuta).delete();
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("rutasUsuario")
          .doc(nombreRuta)
          .delete();

        if (tipoRuta == "Circular" || tipoRuta == "Lineal") {
          await db
            .collection("users")
            .doc(auth.currentUser?.uid)
            .update({
              rutasRealizadas: firebase.firestore.FieldValue.increment(-1),
              puntuacion: firebase.firestore.FieldValue.increment(-5),
            });
        } else if (tipoRuta == "Ascension") {
          await db
            .collection("users")
            .doc(auth.currentUser?.uid)
            .update({
              rutasRealizadas: firebase.firestore.FieldValue.increment(1),
              puntuacion: firebase.firestore.FieldValue.increment(-15),
            });
        }

        this.obtenerRutasDisponibles();
      }
    },
    async modificarRuta(ruta: any) {
      this.opciones = [];
      this.opciones.push("Nombre: " + ruta.nombreRuta);
      this.opciones.push("Localización: " + ruta.localizacion);
      this.opciones.push("Tipo de ruta: " + ruta.tipoRuta);
      this.opciones.push("Valoracion: " + ruta.valoracion);
      this.opciones.push("Kilometros: " + ruta.kilometros);
      this.nombreRutaModificada = ruta.nombreRuta;
      this.modificandoRuta = !this.modificandoRuta;
    },
    async rutaRealizada(fotos: string[], tipoRuta: string) {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("rutasUsuario")
        .doc(this.nombreRutaIntroducido)
        .set({
          estadoRuta: "realizada",
          imagenesIntroducidas: fotos,
        })
        .then(this.$emit("anadir-ruta"));

      if (tipoRuta == "Circular" || tipoRuta == "Lineal") {
        await db
          .collection("users")
          .doc(auth.currentUser?.uid)
          .update({
            rutasRealizadas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(3),
          });
      } else if (tipoRuta == "Ascension") {
        await db
          .collection("users")
          .doc(auth.currentUser?.uid)
          .update({
            rutasRealizadas: firebase.firestore.FieldValue.increment(1),
            puntuacion: firebase.firestore.FieldValue.increment(7),
          });
      }
    },
  },
  setup() {
    const state = reactive({
      rutas: [],
    });
    const ionRouter = useIonRouter();
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const goAddRoute = async () => {
      ionRouter.push("/tabs/anadirRutaNueva");
    };
    const irPerfilUsuario = async (email: string) => {
      console.log(email);
      ionRouter.push("/tabs/tabUserRuta/" + email);
    };
    async function opcionesComentario(
      id: number,
      email: string,
      mensaje: string
    ) {
      if (email == auth.currentUser.email) {
        this.presentActionSheetBorrar(id, mensaje);
      } else {
        this.presentActionSheetDenunciar();
      }
    }
    async function anadirComentario() {
      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then(async (result) => {
          const current = new Date();
          const id = uuidv4();

          const comentario = {
            creador: auth.currentUser.displayName,
            comentario: this.comentarioIntroducido,
            fechaPublicacion: `${current.getDate()}/${
              current.getMonth() + 1
            }/${current.getFullYear()}`,
            fotoPerfilUsuario: result.data().fotoPerfil,
            email: result.data().email,
          };

          this.comentariosMostrados.push(comentario);

          await db
            .collection("rutas")
            .doc(this.nombreRuta)
            .collection("comentarios")
            .doc(id)
            .set({
              creador: auth.currentUser.displayName,
              comentario: this.comentarioIntroducido,
              fechaPublicacion: `${current.getDate()}/${
                current.getMonth() + 1
              }/${current.getFullYear()}`,
              fotoPerfilUsuario: result.data().fotoPerfil,
              email: result.data().email,
            });

          console.log("Comentario introducido en la ruta: " + this.nombreRuta);
          this.comentarioIntroducido = "";
        });
    }
    async function obtenerRutasDisponibles() {
      this.cargando = true;
      var fotoUsuario;
      var puntosUsuario;
      var nivelUsuario;
      await db
        .collection("rutas")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            var comentarios = [];
            await db
              .collection("users")
              .get()
              .then(async (querySnapshot) => {
                querySnapshot.forEach((docFoto) => {
                  if (docFoto.data().email == doc.data().emailUsuario) {
                    fotoUsuario = docFoto.data().fotoPerfil;
                    puntosUsuario = docFoto.data().puntuacion;
                  }
                });

                if (puntosUsuario <= 10) {
                  nivelUsuario = "Novat@";
                } else if (puntosUsuario > 10 && puntosUsuario <= 20) {
                  nivelUsuario = "Caminante";
                } else if (puntosUsuario > 20 && puntosUsuario <= 35) {
                  nivelUsuario = "Intrépid@";
                } else if (puntosUsuario > 35 && puntosUsuario <= 50) {
                  nivelUsuario = "Ruter@";
                } else if (puntosUsuario > 50 && puntosUsuario <= 70) {
                  nivelUsuario = "Expert@";
                } else if (puntosUsuario > 70) {
                  nivelUsuario = "Pro";
                }

                if (doc.data().tipoRuta == "rutaCircular") {
                  await db
                    .collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          id: ruta.id,
                          comentario: ruta.data().comentario,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                          emailCreador: ruta.data().email,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    localizacion: doc.data().localizacion,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: nivelUsuario,
                    tipoRuta: "Circular",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: repeatOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                } else if (doc.data().tipoRuta == "rutaLineal") {
                  await db
                    .collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          id: ruta.id,
                          comentario: ruta.data().comentario,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                          emailCreador: ruta.data().email,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    localizacion: doc.data().localizacion,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: nivelUsuario,
                    tipoRuta: "Lineal",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: resizeOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                }
                if (doc.data().tipoRuta == "ascension") {
                  await db
                    .collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          id: ruta.id,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                          comentario: ruta.data().comentario,
                          emailCreador: ruta.data().email,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    localizacion: doc.data().localizacion,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: nivelUsuario,
                    tipoRuta: "Ascension",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: flagOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                }

                console.log(doc.id, " => ", doc.data());
              });
          });
        });

      this.cargando = false;
      console.log("Estas son las rutas: ");
      console.log(state.rutas);
    }

    return {
      opcionesComentario,
      obtenerRutasDisponibles,
      anadirComentario,
      goAddRoute,
      irPerfilUsuario,
      ...toRefs(state),
      timeOutline,
      starOutline,
      resizeOutline,
      repeatOutline,
      flagOutline,
      analyticsOutline,
      addCircleOutline,
      searchOutline,
      locationOutline,
      checkmarkDoneSharp,
      chatbubbles,
      chevronForwardOutline,
      arrowDownCircleOutline,
      alertOutline,
      closeOutline,
      pencilSharp,
      slideOpts,
      modules: [Navigation, Pagination],
    };
  },
  watch: {
    $route(to, from) {
      this.rutas = [];
      this.obtenerRutasDisponibles();
      console.log(auth.currentUser.displayName);
    },
  },
  mounted() {
    this.obtenerRutasDisponibles();
  },
});
</script>

<style scoped>
ion-modal {
  --border-radius: 16px;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

.cardContent {
  padding-top: 0px;
}
.itemComentario {
  align-items: center;
}
.item {
  padding: 0% 0% 2% 0%;
}

.list {
  padding: 3%;
}
.avatar {
  margin-inline: 0px 12px;
}
.botonComentarios {
  width: 80%;
}
.columnaComentarios {
  display: flex;
  justify-content: center;
}
.grid {
  display: flex;
  height: 100%;
  align-items: center;
}
.col {
  display: flex;
  justify-content: center;
}
.row {
  width: 100%;
}
.ruta {
  width: 100%;
}
.swiper-pagination-bullet {
  background: black;
  opacity: 0.4;
}

.swiper-pagination-bullet-active {
  background: white;
}
</style>
