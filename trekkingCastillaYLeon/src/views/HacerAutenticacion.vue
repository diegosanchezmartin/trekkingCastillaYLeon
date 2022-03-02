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
                <ion-card-title>
                    Bienvenido a trekkingCastillaYLeon
                </ion-card-title>
                <ion-card-subtitle>
                    Iniciar sesión / Registrarse
                </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="
                modo === ModoDeAutenticacion.IniciarSesion 
                ? IniciarSesionConEmailYConstaseña(email, contraseña) 
                : RegistrarseConEmailYContraseña(nombre, email, contraseña)"
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
                        <ion-input v-model="contraseña" type="password"></ion-input>
                    </ion-item>
                    <ion-button expand="block" color="primary" class="ion-margin-top" type="submit">
                        {{modo === ModoDeAutenticacion.IniciarSesion ? "Iniciar sesión" : "Registrarse"}}
                    </ion-button>
                    <ion-button expand="block" color="secondary" class="ion-margin-top" @click="modo = modo === ModoDeAutenticacion.IniciarSesion ? ModoDeAutenticacion.Registrarse : ModoDeAutenticacion.IniciarSesion ">
                        {{modo === ModoDeAutenticacion.IniciarSesion ? "Registrarse" : "Cancelar"}}
                    </ion-button>
                </form>
            </ion-card-content>
            <ion-card-content v-if="mensajeError" class="mensaje-de-error">
                {{mensajeError}}
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
        IonItem } from '@ionic/vue';
import {auth, db} from '../main';
import {reactive, toRefs} from "vue";
import {useIonRouter} from '@ionic/vue';
import {defineComponent} from 'vue';

enum ModoDeAutenticacion{
    IniciarSesion,
    Registrarse,
}
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
    }, 
    setup() {
        const ionRouter = useIonRouter();
        const state = reactive ({
            nombre: "",
            email: "",
            contraseña: "",
            modo: ModoDeAutenticacion.IniciarSesion,
            mensajeError:""
        })
        const IniciarSesionConEmailYConstaseña = async (
            email: string, 
            contraseña: string
        ) => {
            try {
                if(!email || !contraseña) {
                    state.mensajeError="Email y constraseña requeridos!"
                    return;
                }
                await auth.signInWithEmailAndPassword(email, contraseña);
                ionRouter.push("/tabs/tab1")
            
            } catch (error: unknown) {
                if(error instanceof Error) {
                    state.mensajeError = error.message;
                }
            }
        }
        const RegistrarseConEmailYContraseña = async (
            nombre:string, 
            email:string, 
            contraseña: string 
        ) => {
            try {
                if (!nombre || !email || !contraseña) {
                    state.mensajeError = "Nombre, email y constraseña requeridos para registrarte!";
                    return;
                } 
                const authRes = await auth.createUserWithEmailAndPassword(email, contraseña);
                db.collection('users').doc(authRes.user?.uid).set({
                    nombre,
                    email,
                });
                ionRouter.push("/tabs/tab1");
            } catch(error: unknown){
                if(error instanceof Error) {
                    state.mensajeError = error.message;
                }
            }
        };
        return {
            ...toRefs(state),
            IniciarSesionConEmailYConstaseña,
            RegistrarseConEmailYContraseña,
            ModoDeAutenticacion,
        };
    },
});
</script>

<style>
</style>