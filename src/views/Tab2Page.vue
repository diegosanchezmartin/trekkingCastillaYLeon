<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Descubrir</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="app">
        <nav-bar titulo="Busca tu próxima aventura !" />
        <ion-grid>
          <ion-row>
            <trekking-map />
          </ion-row>
          <nav-bar titulo="Ranking de ruteros cañeros!" />
          <ion-row>
            <ion-segment
              class="segmento"
              value="Provincial"
              @ionChange="segmentChanged($event)"
            >
              <ion-segment-button value="Provincial">
                <ion-label>Provincial</ion-label>
              </ion-segment-button>
              <ion-segment-button value="Regional">
                <ion-label>Regional</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-row>
          <ion-row>
            <ion-list>
              <ion-item v-if="primero.name !== ''">
                <ion-avatar slot="start">
                  <img :src="primero.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Primero</h2>
                  <h3>{{ primero.name }}</h3>
                  <p>Puntuacion: {{ primero.pts }}</p>
                </ion-label>
              </ion-item>
              <ion-item v-if="segundo.name !== ''">
                <ion-avatar slot="start">
                  <img :src="segundo.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Segundo</h2>
                  <h3>{{ segundo.name }}</h3>
                  <p>Puntuacion: {{ segundo.pts }}</p>
                </ion-label>
              </ion-item>
              <ion-item v-if="tercero.name !== ''">
                <ion-avatar slot="start">
                  <img :src="tercero.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Tercero</h2>
                  <h3>{{ tercero.name }}</h3>
                  <p>Puntuacion: {{ tercero.pts }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// Ventana descubrir de la aplicacion
import { defineComponent, reactive, toRefs } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonAvatar,
  IonSegmentButton,
  IonSegment,
  IonLabel,
} from "@ionic/vue";
import NavBar from "../components/NavBar.vue";
import TrekkingMap from "../components/TrekkingMap.vue";
import { db, auth } from "@/main";
import { collection, getDocs } from "@firebase/firestore";
export default defineComponent({
  // Pagina de descubrir
  name: "Tab2Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    NavBar,
    TrekkingMap,
    IonGrid,
    IonRow,
    IonList,
    IonItem,
    IonAvatar,
    IonSegmentButton,
    IonSegment,
    IonLabel,
  },
  data() {
    return {
      provincial: true,
      primero: { photo: "", name: "", pts: 0 },
      segundo: { photo: "", name: "", pts: 0 },
      tercero: { photo: "", name: "", pts: 0 },
    };
  },
  methods: {
    segmentChanged(ev: CustomEvent) {
      this.primero.photo = "";
      this.primero.name = "";
      this.primero.ptos = 0;
      this.segundo.photo = "";
      this.segundo.name = "";
      this.segundo.ptos = 0;
      this.tercero.photo = "";
      this.tercero.name = "";
      this.tercero.ptos = 0;
      if (this.provincial == true) {
        this.obtenerRankingRegional();
        this.provincial = false;
      } else {
        this.obtenerRankingProvincial();
        this.provincial = true;
      }
    },
  },
  setup() {
    async function obtenerRankingProvincial() {
      const querySnapshot = await getDocs(collection(db, "users"));
      var provinciaUser;
      await db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          provinciaUser = result.data().provincia;
          querySnapshot.forEach((doc) => {
            if (doc.data().provincia === provinciaUser) {
              if (this.primero.name == "") {
                this.primero.name =
                  doc.data().nombre + " " + doc.data().apellidos;
                this.primero.pts = parseInt(doc.data().puntuacion);
                this.primero.photo = doc.data().fotoPerfil;
              } else {
                if (
                  parseInt(doc.data().puntuacion) > parseInt(this.primero.pts)
                ) {
                  this.tercero.name = this.segundo.name;
                  this.tercero.pts = this.segundo.pts;
                  this.tercero.photo = this.segundo.photo;
                  this.segundo.name = this.primero.name;
                  this.segundo.pts = this.primero.pts;
                  this.segundo.photo = this.primero.photo;
                  this.primero.name =
                    doc.data().nombre + " " + doc.data().apellidos;
                  this.primero.pts = doc.data().puntuacion;
                  this.primero.photo = doc.data().fotoPerfil;
                } else {
                  if (this.segundo.name == "") {
                    this.segundo.name =
                      doc.data().nombre + " " + doc.data().apellidos;
                    this.segundo.pts = parseInt(doc.data().puntuacion);
                    this.segundo.photo = doc.data().fotoPerfil;
                  } else {
                    if (
                      parseInt(doc.data().puntuacion) >
                      parseInt(this.segundo.pts)
                    ) {
                      this.tercero.name = this.segundo.name;
                      this.tercero.pts = this.segundo.pts;
                      this.tercero.photo = this.segundo.photo;
                      this.segundo.name =
                        doc.data().nombre + " " + doc.data().apellidos;
                      this.segundo.pts = doc.data().puntuacion;
                      this.segundo.photo = doc.data().fotoPerfil;
                    } else {
                      if (this.tercero.name == "") {
                        this.tercero.name =
                          doc.data().nombre + " " + doc.data().apellidos;
                        this.tercero.pts = parseInt(doc.data().puntuacion);
                        this.tercero.photo = doc.data().fotoPerfil;
                      } else {
                        if (
                          parseInt(doc.data().puntuacion) >
                          parseInt(this.tercero.pts)
                        ) {
                          this.tercero.name =
                            doc.data().nombre + " " + doc.data().apellidos;
                          this.tercero.pts = doc.data().puntuacion;
                          this.tercero.photo = doc.data().fotoPerfil;
                        }
                      }
                    }
                  }
                }
              }
            }
          });
        });
    }
    async function obtenerRankingRegional() {
      const querySnapshot = await getDocs(collection(db, "users"));
      await db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          querySnapshot.forEach((doc) => {
            if (this.primero.name == "") {
              this.primero.name =
                doc.data().nombre + " " + doc.data().apellidos;
              this.primero.pts = parseInt(doc.data().puntuacion);
              this.primero.photo = doc.data().fotoPerfil;
            } else {
              if (
                parseInt(doc.data().puntuacion) > parseInt(this.primero.pts)
              ) {
                //if (this.segundo == "") {
                this.tercero.name = this.segundo.name;
                this.tercero.pts = this.segundo.pts;
                this.tercero.photo = this.segundo.photo;
                this.segundo.name = this.primero.name;
                this.segundo.pts = this.primero.pts;
                this.segundo.photo = this.primero.photo;
                this.primero.name =
                  doc.data().nombre + " " + doc.data().apellidos;
                this.primero.pts = doc.data().puntuacion;
                this.primero.photo = doc.data().fotoPerfil;
              } else {
                    if (
                      parseInt(doc.data().puntuacion) >
                      parseInt(this.segundo.pts)
                    ) {
                      this.tercero.name = this.segundo.name;
                      this.tercero.pts = this.segundo.pts;
                      this.tercero.photo = this.segundo.photo;
                      this.segundo.name =
                        doc.data().nombre + " " + doc.data().apellidos;
                      this.segundo.pts = doc.data().puntuacion;
                      this.segundo.photo = doc.data().fotoPerfil;
                    } else {
                      if (this.tercero.name == "") {
                        this.tercero.name =
                          doc.data().nombre + " " + doc.data().apellidos;
                        this.tercero.pts = parseInt(doc.data().puntuacion);
                        this.tercero.photo = doc.data().fotoPerfil;
                      } else {
                        if (
                          parseInt(doc.data().puntuacion) >
                          parseInt(this.tercero.pts)
                        ) {
                          this.tercero.name =
                            doc.data().nombre + " " + doc.data().apellidos;
                          this.tercero.pts = doc.data().puntuacion;
                          this.tercero.photo = doc.data().fotoPerfil;
                        }
                      }
                    }
                  }
            }
          });
        });
    }
    return {
      obtenerRankingProvincial,
      obtenerRankingRegional,
    };
  },
  watch: {
    $route(to, from) {
      this.primero.photo = "";
      this.primero.name = "";
      this.primero.ptos = 0;
      this.segundo.photo = "";
      this.segundo.name = "";
      this.segundo.ptos = 0;
      this.tercero.photo = "";
      this.tercero.name = "";
      this.tercero.ptos = 0;
      this.provincial = true;
      this.obtenerRankingProvincial();
    },
  },
  mounted() {
    this.provincial = true;
    this.obtenerRankingProvincial();
  },
});
</script>

<style scoped>
.segmento {
  margin: 7px;
}
.etiqueta {
  display: flex;
  justify-content: center;
}
</style>
