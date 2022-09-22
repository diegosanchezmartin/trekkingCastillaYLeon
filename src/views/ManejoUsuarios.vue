<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Manejo usuarios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Manejo usuarios</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="usuario in usuarios" v-bind:key="usuario.id">
          <ion-avatar slot="start">
            <img :src="usuario.fotoUsuario" />
          </ion-avatar>
          <ion-label>
            <h5>{{ usuario.nombreUsuario }}</h5>
            <p>{{ usuario.email }}</p>
          </ion-label>
          <ion-icon slot="end" :icon="chevronForwardOutline" @click="mostrarOpcionesUsuario(usuario.nombreUsuario, usuario.id)"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
  
  <script lang="ts">
import { db } from "@/main";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonAvatar,
  IonList,
  IonIcon,
  IonLabel,
  actionSheetController,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { defineComponent } from "vue";
export default defineComponent({
  name: "manejoUsuarios",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonAvatar,
    IonList,
    IonIcon,
    IonLabel,
  },
  data() {
    return {
      usuarios: [],
    };
  },
  setup() {
    async function mostrarOpcionesUsuario(nombre: string, id: string) {
        const actionSheet = await actionSheetController
        .create({
          header: nombre,
          buttons: [
            {
              text: 'Eliminar cuenta',
              role: 'destructive',
              handler: () => {
                console.log('Eliminar clickado')
              },
            },
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancelar clickado')
              },
            },
          ],
        });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      if(role === "destructive") {
        await db.collection("users").doc(id).delete();
        this.usuarios = [];
        this.obtenerListadoUsuarios();
      }
    }
    async function obtenerListadoUsuarios() {
      await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.usuarios.push({
              id: doc.id,
              nombreUsuario: doc.data().nombre + doc.data().apellidos,
              fotoUsuario: doc.data().fotoPerfil,
              email: doc.data().email,
            });
          });
        });
    }
    return {
      chevronForwardOutline,
      obtenerListadoUsuarios,
      mostrarOpcionesUsuario,
    };
  },
  mounted() {
    this.obtenerListadoUsuarios();
  },
});
</script>
  