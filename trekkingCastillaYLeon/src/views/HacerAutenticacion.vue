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
              <ion-label position="floating">Experiencia: </ion-label>
              <ion-select
                interface="popover"
                placeholder="¿Cuánta experiencia tienes?"
                required
                v-model="experienciaUsuario"
              >
                <ion-select-option value="novato"
                  >Acabo de empezar</ion-select-option
                >
                <ion-select-option value="normal"
                  >He hecho alguna ruta...</ion-select-option
                >
                <ion-select-option value="experto"
                  >Suelo rutear bastante</ion-select-option
                >
                <ion-select-option value="pro"
                  >Voy de marcha casi a diario</ion-select-option
                >
              </ion-select>
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { auth, db, storage } from "../main";
import { reactive, toRefs } from "vue";
import { useIonRouter } from "@ionic/vue";
import { defineComponent, ref } from "vue";
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
    IonSelect,
    IonSelectOption,
  }, 
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const ionRouter = useIonRouter();
    const state = reactive({
      nombre: "",
      email: "",
      contrasena: "",
      experienciaUsuario: "",
      modo: ModoDeAutenticacion.IniciarSesion,
      mensajeError: "",
      contadorInicial: 0,
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
        const storageRef = storage.ref();
        var fotoUsuario: string;
        if(state.experienciaUsuario == "novato"){
          fotoUsuario = await storageRef.child("FotosCreacionPerfil/novato.jpg").getDownloadURL();
        }else if(state.experienciaUsuario == "normal"){
          fotoUsuario = await storageRef.child("FotosCreacionPerfil/normal.jpg").getDownloadURL();
        }else if(state.experienciaUsuario == "experto"){
          fotoUsuario = await storageRef.child("FotosCreacionPerfil/experto.jpg").getDownloadURL();
        }else if(state.experienciaUsuario == "pro"){
          fotoUsuario = await storageRef.child("FotosCreacionPerfil/pro.jpg").getDownloadURL();
        }
        db.collection("users").doc(authRes.user?.uid).set({
          nombre,
          email,
          puntuacionInicial: state.contadorInicial,
          rutasRealizadas: state.contadorInicial,
          rutasAnadidas: state.contadorInicial,
          rutasModificadas: state.contadorInicial,
          fotoPerfil: fotoUsuario,
        });
        const user = auth.currentUser;
        user.updateProfile({
          displayName: nombre
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