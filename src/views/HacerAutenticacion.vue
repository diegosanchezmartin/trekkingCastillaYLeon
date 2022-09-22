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
            @submit.prevent="AccionSeleccionada(nombre, email, contrasena)"
          >
            <ion-item v-if="modo === ModoDeAutenticacion.Registrarse">
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="nombre"></ion-input>
            </ion-item>
            <ion-item v-if="modo === ModoDeAutenticacion.Registrarse">
              <ion-label position="floating">Apellidos</ion-label>
              <ion-input v-model="apellidos"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item
              v-if="
                modo === ModoDeAutenticacion.Registrarse ||
                modo === ModoDeAutenticacion.IniciarSesion
              "
            >
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input v-model="contrasena" type="password"></ion-input>
            </ion-item>
            <ion-item v-if="modo === ModoDeAutenticacion.Registrarse">
              <ion-label position="floating">Provincia: </ion-label>
              <ion-select
                interface="popover"
                placeholder="Selecciona tu provincia"
                required
                v-model="provinciaUsuario"
              >
                <ion-select-option value="León">León</ion-select-option>
                <ion-select-option value="Zamora">Zamora</ion-select-option>
                <ion-select-option value="Salamanca"
                  >Salamanca</ion-select-option
                >
                <ion-select-option value="Palencia">Palencia</ion-select-option>
                <ion-select-option value="Valladolid"
                  >Valladolid</ion-select-option
                >
                <ion-select-option value="Ávila">Ávila</ion-select-option>
                <ion-select-option value="Burgos">Burgos</ion-select-option>
                <ion-select-option value="Soria">Soria</ion-select-option>
                <ion-select-option value="Segovia">Segovia</ion-select-option>
              </ion-select>
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
              v-if="modo === ModoDeAutenticacion.IniciarSesion"
            >
              Iniciar sesión
            </ion-button>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-else-if="modo === ModoDeAutenticacion.Registrarse"
            >
              Registrarse
            </ion-button>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
              v-else
            >
              Recuperar contraseña
            </ion-button>
            <ion-button
              expand="block"
              color="tertiary"
              class="ion-margin-top"
              @click="modo = modo = ModoDeAutenticacion.RecuperarContraseña"
              v-if="modo === ModoDeAutenticacion.IniciarSesion || modo === ModoDeAutenticacion.Registrarse"
            >
              Recuperar contraseña
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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

enum ModoDeAutenticacion {
  IniciarSesion,
  Registrarse,
  RecuperarContraseña,
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
    const setOpen = (state: boolean) => (isOpenRef.value = state);
    const ionRouter = useIonRouter();
    const state = reactive({
      nombre: "",
      apellidos: "",
      email: "",
      contrasena: "",
      provinciaUsuario: "",
      experienciaUsuario: "",
      modo: ModoDeAutenticacion.IniciarSesion,
      mensajeError: "",
      infoUsuario: "Nuev@ aventurer@ con muchas ganas de patear!",
      contadorInicial: 0,
    });
    const AccionSeleccionada = async (nombre: string,
      email: string,
      contrasena: string
    ) => {
      if(state.modo === ModoDeAutenticacion.IniciarSesion){
        IniciarSesionConEmailYConstasena(email, contrasena)
      } else if(state.modo === ModoDeAutenticacion.Registrarse){
        RegistrarseConEmailYcontrasena(nombre, email, contrasena)
      } else {
        ReiniciarContraseñaConEmail(email);
      }
    };
    const ReiniciarContraseñaConEmail = async (email: string) => {
      try {
        if (!email) {
          state.mensajeError = "Email requerido!";
          return;
        }
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            console.log("Email de restablecimiento de contraseña enviado");
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            state.mensajeError = errorMessage;
          });
      } catch (error: unknown) {
        if (error instanceof Error) {
          state.mensajeError = error.message;
        }
      }
    };
    const IniciarSesionConEmailYConstasena = async (
      email: string,
      contrasena: string
    ) => {
      try {
        if (!email || !contrasena) {
          state.mensajeError = "Email y constraseña requeridos!";
          return;
        }
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
        if (state.experienciaUsuario == "novato") {
          fotoUsuario = await storageRef
            .child("FotosCreacionPerfil/novato.jpeg")
            .getDownloadURL();
        } else if (state.experienciaUsuario == "normal") {
          fotoUsuario = await storageRef
            .child("FotosCreacionPerfil/normal.jpeg")
            .getDownloadURL();
        } else if (state.experienciaUsuario == "experto") {
          fotoUsuario = await storageRef
            .child("FotosCreacionPerfil/experto.jpeg")
            .getDownloadURL();
        } else if (state.experienciaUsuario == "pro") {
          fotoUsuario = await storageRef
            .child("FotosCreacionPerfil/pro.jpeg")
            .getDownloadURL();
        }
        const usernameApp = email.split("@")[0];
        const current = new Date();
        await db
          .collection("users")
          .doc(authRes.user?.uid)
          .set({
            nombreUsuario: usernameApp,
            nombre,
            apellidos: state.apellidos,
            email,
            provincia: state.provinciaUsuario,
            fechaAlta: `${current.getDate()}/${
              current.getMonth() + 1
            }/${current.getFullYear()}`,
            puntuacion: state.contadorInicial,
            rutasRealizadas: state.contadorInicial,
            rutasAnadidas: state.contadorInicial,
            rutasModificadas: state.contadorInicial,
            fotoPerfil: fotoUsuario,
            infoUsuario: state.infoUsuario,
            esAdmin: false,
          });
        const user = auth.currentUser;
        user.updateProfile({
          displayName: nombre,
        });
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
      ...toRefs(state),
      AccionSeleccionada,
      ReiniciarContraseñaConEmail,
      IniciarSesionConEmailYConstasena,
      RegistrarseConEmailYcontrasena,
      ModoDeAutenticacion,
    };
  },
});
</script>