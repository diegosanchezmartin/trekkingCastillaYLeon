<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Iniciar sesión / Registrarse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title> Bienvenido a trekkingCastillaYLeon </ion-card-title>
          <ion-card-subtitle> Iniciar sesión / Registrarse </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form
            @submit.prevent="
              modo === ModoDeAutenticacion.IniciarSesion
                ? IniciarSesionConEmailYConstaseña(email, contrasena)
                : RegistrarseConEmailYcontrasena(nombre, email, contrasena)
            "
          >
            <ion-item v-if="modo === ModoDeAutenticacion.Registrarse">
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="nombre"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input v-model="contrasena" type="password"></ion-input>
            </ion-item>
            <ion-item v-if="modo === ModoDeAutenticacion.Registrarse">
              <ion-button @click="setOpen(true)" >
                Foto de perfil
              </ion-button>
              <ion-action-sheet
                :is-open="isOpenRef"
                header = "Elige tu oto de perfil"
                :buttons="buttons"
                @didDismiss="setOpen(false)">
              </ion-action-sheet>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{
                modo === ModoDeAutenticacion.IniciarSesion
                  ? "Iniciar sesión"
                  : "Registrarse"
              }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="
                modo =
                  modo === ModoDeAutenticacion.IniciarSesion
                    ? ModoDeAutenticacion.Registrarse
                    : ModoDeAutenticacion.IniciarSesion
              "
            >
              {{
                modo === ModoDeAutenticacion.IniciarSesion
                  ? "Registrarse"
                  : "Cancelar"
              }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="mensajeError" class="mensaje-de-error">
          {{ mensajeError }}
        </ion-card-content>
      </ion-card>
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  actionSheetController,
  IonActionSheet,
} from "@ionic/vue";
import { auth, db } from "../main";
import { reactive, toRefs } from "vue";
import { useIonRouter } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { leafOutline, schoolOutline, medalOutline, flameOutline} from "ionicons/icons";
import { data } from "dom7";

enum ModoDeAutenticacion {
  IniciarSesion,
  Registrarse,
}

export var usernameApp = "";

export default defineComponent({
  nombre: "HacerAutenticacion",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonCardHeader,
    IonActionSheet
  },
  /*methods: {
    async setShowActionSheet() {
      const actionSheet = await actionSheetController
      .create({
        header: 'Iconos perfil',
        buttons : [],
      });
      await actionSheet.present();

      const { data } = await actionSheet.onDidDismiss();
      console.log('Cuadro resuelto con datos: ', data);
    }
  },*/ 
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const buttons = [
          {
            text: 'No has hecho nunca una ruta?',
            icon: leafOutline,
            id: 'noob-button',
            data: 'noob',
            handler: () => {
              console.log('Hoja seleccionada');
            },
          },
          {
            text: 'Has salido de marcha alguna vez...',
            icon: schoolOutline,
            id: 'normal-button',
            data: 'normal',
            handler: () => {
              console.log('Birrete seleccionado');
            },
          },
          {
            text: 'Vas a la montaña todos los fines de semana',
            icon: medalOutline,
            id: 'expert-button',
            data: 'expert',
            handler: () => {
              console.log('Medalla seleccionada');
            },
          },
          {
            text: 'Vives para rutear y ruteas para vivir',
            icon: flameOutline,
            id: 'pro-button',
            data: 'pro',
            handler: () => {
              console.log('Llama seleccionada');
            },
          },
        ];
    const ionRouter = useIonRouter();
    const state = reactive({
      nombre: "",
      email: "",
      contrasena: "",
      fotoPerfil: "",
      modo: ModoDeAutenticacion.IniciarSesion,
      mensajeError: "",
    });
    const IniciarSesionConEmailYConstaseña = async (
      email: string,
      contrasena: string
    ) => {
      try {
        if (!email || !contrasena) {
          state.mensajeError = "Email y constraseña requeridos!";
          return;
        }
        usernameApp = email.split("@")[0];
        console.log(usernameApp = email.split("@")[0]); 
        await auth.signInWithEmailAndPassword(email, contrasena);
        ionRouter.push("/tabs/tab1");
      } catch (error: unknown) {
        if (error instanceof Error) {
          state.mensajeError = error.message;
        }
      }
    };
    const RegistrarseConEmailYcontrasena = async (
      nombre: string,
      email: string,
      contrasena: string
    ) => {
      try {
        if (!nombre || !email || !contrasena) {
          state.mensajeError =
            "Nombre, email y constraseña requeridos para registrarte!";
          return;
        }
        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          contrasena
        );
        db.collection("users").doc(authRes.user?.uid).set({
          nombre,
          email,
        });
        usernameApp = email.split("@")[0];
        ionRouter.push("/tabs/tab1");
      } catch (error: unknown) {
        if (error instanceof Error) {
          state.mensajeError = error.message;
        }
      }
    };
    return {
      buttons,
      isOpenRef,
      setOpen,
      usernameApp,
      ...toRefs(state),
      IniciarSesionConEmailYConstaseña,
      RegistrarseConEmailYcontrasena,
      ModoDeAutenticacion,
    };
  },
});
</script>

<style>
</style>