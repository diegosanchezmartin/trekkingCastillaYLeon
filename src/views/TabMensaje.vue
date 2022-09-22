<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tabMensajes"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="grid">
        <ion-col class="columna">
          <ion-row class="fila">
            <ion-list class="lista">
              <ion-list-header class="ionListHeader">{{
                nombreUsuarioMensaje
              }}</ion-list-header>
              <ion-item
                v-for="mensaje in mensajesMostrados"
                v-bind:key="mensaje.id"
                @click="opcionesMensaje(mensaje.id, mensaje.creador, mensaje.mensaje)"
              >
                <ion-avatar slot="start">
                  <img :src="mensaje.fotoPerfil" />
                </ion-avatar>
                <ion-label>
                  <h3>{{ mensaje.mensaje }}</h3>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-row>
          <ion-row class="fila">
            <ion-item class="mensaje">
              <ion-label position="floating">Mensaje</ion-label>
              <ion-input
                clear-input
                type="text"
                v-model="mensajeUsuario"
              ></ion-input
              ><ion-icon
                :icon="arrowDownCircleOutline"
                slot="end"
                @click="anadirMensaje()"
              />
            </ion-item>
          </ion-row>
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonAvatar,
  IonLabel,
  IonItem,
  IonListHeader,
  IonList,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  actionSheetController,
  modalController,
} from "@ionic/vue";
import { arrowDownCircleOutline } from "ionicons/icons";
import { auth, db } from "@/main";
import { defineComponent, reactive, toRefs, ref } from "vue";
import ModalMensaje from '/src/components/ModalMensaje.vue';

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "TabMensajes",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonBackButton,
    IonButtons,
    IonAvatar,
    IonLabel,
    IonItem,
    IonListHeader,
    IonList,
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
  },
  data() {
    return {
      mensajesMostrados: [],
    };
  },
  methods: {
    async presentActionSheetBorrar(id: number, mensaje: string) {
      const actionSheet = await actionSheetController.create({
        header: "Mensaje",
        buttons: [
          {
            text: "Borrar",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              console.log("Borrar mensaje clickado");
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
      }
    },
    async presentActionSheetDenunciar(id: number) {
      const actionSheet = await actionSheetController.create({
        header: "Mensaje",
        buttons: [
          {
            text: "Denunciar",
            role: "destructive",
            id: "delete-button",
            data: {
              type: "delete",
            },
            handler: () => {
              console.log("Denunciar mensaje clickado");
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
  },
  setup() {
    const state = reactive({
      imagenUsuarioMensaje: "",
      nombreUsuarioMensaje: "",
      emailUsuario: "",
      mensajeUsuario: "",
      fotoPerfilUsuario: "",
      emailUsuarioEmisor: "",
      uidUsuarioReceptor: "",
      uidMensajeABorrar: "",
    });

    async function opcionesMensaje(id: number, creador: string, mensaje: string) {
      if (creador == auth.currentUser.displayName) {
        this.presentActionSheetBorrar(id, mensaje);
      } else {
        this.presentActionSheetDenunciar();
      }
    }

    async function anadirMensaje() {
      const current = new Date();
      var horas, minutos, segundos, dia, mes, milisegundos;
      if (current.getHours() < 10) {
        horas = "0" + current.getHours();
      } else {
        horas = current.getHours();
      }
      if (current.getMinutes() < 10) {
        minutos = "0" + current.getMinutes();
      } else {
        minutos = current.getMinutes();
      }
      if (current.getSeconds() < 10) {
        segundos = "0" + current.getSeconds();
      } else {
        segundos = current.getSeconds();
      }
      if (current.getDate() < 10) {
        dia = "0" + current.getDate();
      } else {
        dia = current.getDate();
      }
      if (current.getMonth() < 10) {
        mes = "0" + current.getMonth();
      } else {
        mes = current.getMonth();
      }
      if (current.getMilliseconds() < 10) {
        milisegundos = "00" + current.getMilliseconds();
      } else if (current.getMilliseconds() < 100) {
        milisegundos = "0" + current.getMilliseconds();
      } else {
        milisegundos = current.getMilliseconds();
      }

      const idMensaje = uuidv4();
      const mensaje = {
        id: idMensaje,
        creador: auth.currentUser.displayName,
        mensaje: this.mensajeUsuario,
        fechaPublicacion: `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`,
        fotoPerfil: this.fotoPerfilUsuario,
      };

      this.mensajesMostrados.push(mensaje);

      console.log(current);

      //Esto lo hago porque si no añado un campo a la colección a veces no pilla bien el documento
      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("mensajes")
        .doc(this.emailUsuario)
        .set({
          fechaPublicacion: `${current.getDate()}${
            current.getMonth() + 1
          }${current.getFullYear()}${current.getHours()}${current.getMinutes()}${current.getSeconds()}${current.getMilliseconds()}`,
        });

      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("mensajes")
        .doc(this.emailUsuario)
        .collection("conversacion")
        .doc(
          dia +
            mes +
            current.getFullYear() +
            horas +
            minutos +
            segundos +
            milisegundos
        )
        .set({
          creador: auth.currentUser.displayName,
          mensaje: this.mensajeUsuario,
          fechaPublicacion: `${current.getDate()}${
            current.getMonth() + 1
          }${current.getFullYear()}${current.getHours()}${current.getMinutes()}${current.getSeconds()}${current.getMilliseconds()}`,
        });

      await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (doc.data().email == this.emailUsuario) {
              this.uidUsuarioReceptor = doc.id;

              //Esto lo hago porque si no añado un campo a la colección a veces no pilla bien el documento
              await db
                .collection("users")
                .doc(this.uidUsuarioReceptor)
                .collection("mensajes")
                .doc(this.emailUsuarioEmisor)
                .set({
                  fechaPublicacion: `${current.getDate()}${
                    current.getMonth() + 1
                  }${current.getFullYear()}${current.getHours()}${current.getMinutes()}${current.getSeconds()}${current.getMilliseconds()}`,
                });

              await db
                .collection("users")
                .doc(this.uidUsuarioReceptor)
                .collection("mensajes")
                .doc(this.emailUsuarioEmisor)
                .collection("conversacion")
                .doc(
                  dia +
                    mes +
                    current.getFullYear() +
                    horas +
                    minutos +
                    segundos +
                    milisegundos
                )
                .set({
                  creador: auth.currentUser.displayName,
                  mensaje: this.mensajeUsuario,
                  fechaPublicacion: `${current.getDate()}/${
                    current.getMonth() + 1
                  }/${current.getFullYear()}-${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}::${current.getMilliseconds()}`,
                });
              this.mensajeUsuario = "";
            }
          });
        });

      console.log("Mensaje enviado: " + mensaje.mensaje);
    }

    async function cargarPaginaMensajes() {
      const usuario = await db.collection("users").doc(auth.currentUser?.uid);
      const doc = await usuario.get();
      if (!doc.exists) {
        console.log("Error!");
      } else {
        this.fotoPerfilUsuario = doc.data().fotoPerfil;
        this.emailUsuarioEmisor = doc.data().email;
      }

      await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((result) => {
            if (result.data().email == this.emailUsuario) {
              state.nombreUsuarioMensaje =
                result.data().nombre + " " + result.data().apellidos;
              state.imagenUsuarioMensaje = result.data().fotoPerfil;
              console.log(
                state.imagenUsuarioMensaje + " " + state.nombreUsuarioMensaje
              );
            }
          });
        });

      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("mensajes")
        .doc(this.emailUsuario)
        .collection("conversacion")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((result) => {
            var mensaje;
            if (result.data().creador === auth.currentUser?.displayName) {
              mensaje = {
                id: result.data().id,
                creador: result.data().creador,
                mensaje: result.data().mensaje,
                fechaPublicacion: result.data().fechaPublicacion,
                fotoPerfil: this.fotoPerfilUsuario,
              };
            } else {
              mensaje = {
                id: result.data().id,
                creador: result.data().creador,
                mensaje: result.data().mensaje,
                fechaPublicacion: result.data().fechaPublicacion,
                fotoPerfil: this.imagenUsuarioMensaje,
              };
            }
            this.mensajesMostrados.push(mensaje);
          });
        });
    }
    return {
      ...toRefs(state),
      opcionesMensaje,
      anadirMensaje,
      cargarPaginaMensajes,
      arrowDownCircleOutline,
    };
  },
  mounted() {
    this.mensajesMostrado = [];
    this.emailUsuario = this.$route.params.email;
    this.cargarPaginaMensajes();
  },
});
</script>

<style scoped>
.grid {
  height: 100%;
}
.columna {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fila {
  width: 100%;
}
.lista {
  width: 100%;
}
.mensaje {
  width: 100%;
  align-items: center;
}
.ionListHeader {
  margin: 0px 0px 14px 0px;
}
</style>