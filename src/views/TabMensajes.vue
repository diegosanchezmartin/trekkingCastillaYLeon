<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mensajes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mensajes</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-list-header> Conversaciones recientes </ion-list-header>

        <ion-item
          v-for="conversacion in conversaciones"
          v-bind:key="conversacion.id"
          @click="irAlaConversacion(conversacion.emailUsuario)"
        >
          <ion-avatar slot="start">
            <img :src="conversacion.fotoUser" />
          </ion-avatar>
          <ion-label>
            <h2>{{ conversacion.nombreUser }}</h2>
            <h3>{{ conversacion.infoUser }}</h3>
            <p>{{ conversacion.ultimoMensaje }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonListHeader,
  useIonRouter,
} from "@ionic/vue";
import { auth, db } from "@/main";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "TabMensajes",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonList,
    IonItem,
    IonAvatar,
    IonListHeader,
  },
  data() {
    return {
      conversaciones: [],
    };
  },
  setup() {
    const state = reactive({
      imagenUsuarioMensaje: "",
      nombreUsuarioMensaje: "",
      mensajeUsuario: "",
    });
    const ionRouter = useIonRouter();
    const irAlaConversacion = async (emailUser: string) => {
      ionRouter.push("/tabs/tabMensaje/" + emailUser);
    };
    async function cargarPaginaMensajes() {
      await db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("mensajes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (result) => {
            console.log(result);
            var fotoUserConversacion,
              infoUserConversacion,
              ultimoMensaje,
              nombreUserConversacion,
              conversacion;
            const emailUserConversacion = result.id;
            await db
              .collection("users")
              .get()
              .then((query) => {
                query.forEach((user) => {
                  if (user.data().email === emailUserConversacion) {
                    fotoUserConversacion = user.data().fotoPerfil;
                    infoUserConversacion = user.data().infoUsuario;
                    nombreUserConversacion =
                      user.data().nombre + user.data().apellidos;
                  }
                });
              });
            await db
              .collection("users")
              .doc(auth.currentUser?.uid)
              .collection("mensajes")
              .doc(emailUserConversacion)
              .collection("conversacion")
              .get()
              .then((querySnapshot2) => {
                querySnapshot2.forEach((mensaje) => {
                  ultimoMensaje = mensaje.data().mensaje;
                });
                conversacion = {
                  nombreUser: nombreUserConversacion,
                  fotoUser: fotoUserConversacion,
                  infoUser: infoUserConversacion,
                  ultimoMensaje: ultimoMensaje,
                  emailUsuario: emailUserConversacion,
                };
                console.log(conversacion);
                this.conversaciones.push(conversacion);
              });
          });
        });
    }
    return {
      cargarPaginaMensajes,
      irAlaConversacion,
    };
  },
  mounted() {
    this.cargarPaginaMensajes();
  },
});
</script>