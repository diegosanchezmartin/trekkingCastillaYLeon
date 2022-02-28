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
                mode === ModoDeAutenticacion.IniciarSesion 
                ? IniciarSesionConEmailYConstaseña(email, contraseña) 
                : registrarseConEmailYContraseña(nombre, email, contraseña)
                ">
                    <ion-item v-if="mode === ModoDeAutenticacion.Registrarse">
                        <ion-label position="floating">Nombre</ion-label>
                        <ion-input v-model="nombre"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Email</ion-label>
                        <ion-input v-model="email"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Contraseña</ion-label>
                        <ion-input v-model="contraseña"></ion-input>
                    </ion-item>
                    <ion-button expand="block" color="primary" class="ion-margin-top" type="submit">
                        {{mode === ModoDeAutenticacion.IniciarSesion ? "Iniciar sesión" : "Registrarse"}}
                    </ion-button>
                    <ion-button expand="block" color="secondary" class="ion-margin-top" @click="mode = mode === ModoDeAutenticacion.IniciarSesion ? ModoDeAutenticacion.Registrarse : ModoDeAutenticacion.IniciarSesion">
                        {{mode === ModoDeAutenticacion.Registrarse ? "Registrarse" : "Cancelar"}}
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
        IonCardSubtitle, 
        IonCardTitle, 
        IonCardContent, 
        IonInput, 
        IonButton, 
        IonLabel, 
        IonItem } from '@ionic/vue';

import {auth, db} from '../main';
import {reactive, toRefs} from "vue";
import {useRouter} from "vue-router";

enum ModoDeAutenticacion{
    IniciarSesion,
    Registrarse
}

export default {
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
        IonItem
    }, 
    setup() {
        const router = useRouter();
        const state = reactive ({
            nombre: "",
            email: "",
            constraseña: "",
            modo: ModoDeAutenticacion.IniciarSesion,
            mensajeError:""
        })

        const IniciarSesionConEmailYConstaseña = async (email: string, contraseña: string) => {
            try {
                if(!email || !contraseña) {
                    state.mensajeError="Email y constraseña requeridos!"
                    return;
                }

                await auth.signInWithEmailAndPassword(email, contraseña);
                router.push("/tab/tab1")
            
            } catch (error) {
                if(error instanceof Error) {
                    state.mensajeError = error.message;
                }
            }
        }

        const registrarseConEmailYContraseña = async (
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

                router.push("/tabs/tab1");
            } catch(error){
                if(error instanceof Error) {
                    state.mensajeError = error.message;
                }
            }
        };

        return {
            ...toRefs(state),
            IniciarSesionConEmailYConstaseña,
            registrarseConEmailYContraseña,
            ModoDeAutenticacion,
        };
    },
};
</script>

<style>

</style>
