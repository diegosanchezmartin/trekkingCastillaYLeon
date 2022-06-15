<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
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
              <ion-item>
                <ion-avatar slot="start">
                  <img :src="primeroProvincial.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Primero</h2>
                  <h3>{{ primeroProvincial.name }}</h3>
                  <p>Puntuacion: {{ primeroProvincial.pts }}</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <img :src="segundoProvincial.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Segundo</h2>
                  <h3>{{ segundoProvincial.name }}</h3>
                  <p>Puntuacion: {{ segundoProvincial.pts }}</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <img :src="terceroProvincial.photo" />
                </ion-avatar>
                <ion-label>
                  <h2>Tercero</h2>
                  <h3>{{ terceroProvincial.name }}</h3>
                  <p>Puntuacion: {{ terceroProvincial.pts }}</p>
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
      primeroProvincial: { photo: "", name: "", pts: 0 },
      segundoProvincial: { photo: "", name: "", pts: 0 },
      terceroProvincial: { photo: "", name: "", pts: 0 },
      primeroRegional: { photo: "", name: "", pts: 0 },
      segundoRegional: { photo: "", name: "", pts: 0 },
      terceroRegional: { photo: "", name: "", pts: 0 },
    };
  },
  methods: {
    segmentChanged(ev: CustomEvent) {
      console.log("Segment changed", ev);
    },
  },
  setup() {
    async function obtenerRanking() {
      const querySnapshot = await getDocs(collection(db, "users"));
      var provinciaUser;
      var ptsPrimeroReg, ptsSegundoReg, ptsTerceroReg;
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          provinciaUser = result.data().provincia;
          querySnapshot.forEach((doc) => {
            if (doc.data().provincia === provinciaUser) {
              if (this.primeroProvincial.name == "") {
                this.primeroProvincial.name =
                  doc.data().nombre + " " + doc.data().apellidos;
                this.primeroProvincial.pts = parseInt(doc.data().puntuacion);
                this.primeroProvincial.photo =
                  doc.data().fotoPerfil;
              } else {
                if (
                  parseInt(doc.data().puntuacion) >
                  parseInt(this.primeroProvincial.pts)
                ) {
                  //if (this.segundoProvincial == "") {
                  this.terceroProvincial.name = this.segundoProvincial.name;
                  this.terceroProvincial.pts = this.segundoProvincial.pts;
                  this.terceroProvincial.photo = this.segundoProvincial.photo;
                  this.segundoProvincial.name = this.primeroProvincial.name;
                  this.segundoProvincial.pts = this.primeroProvincial.pts;
                  this.segundoProvincial.photo = this.primeroProvincial.photo;
                  this.primeroProvincial.name =
                    doc.data().nombre + " " + doc.data().apellidos;
                  this.primeroProvincial.pts = doc.data().puntuacion;
                  this.primeroProvincial.photo =
                    doc.data().fotoPerfil;
                  //} else {

                  //}
                } else {
                  if (
                    parseInt(doc.data().puntuacion) >
                    parseInt(this.segundoProvincial.pts)
                  ) {
                    this.terceroProvincial.name = this.segundoProvincial.name;
                    this.terceroProvincial.pts = this.segundoProvincial.pts;
                    this.terceroProvincial.photo = this.segundoProvincial.photo;
                    this.segundoProvincial.name =
                      doc.data().nombre + " " + doc.data().apellidos;
                    this.segundoProvincial.pts = doc.data().puntuacion;
                    this.segundoProvincial.photo =
                      doc.data().fotoPerfil;
                  } else {
                    if (
                      parseInt(doc.data().puntuacion) >
                      parseInt(this.terceroProvincial.pts)
                    ) {
                      this.terceroProvincial.name =
                        doc.data().nombre + " " + doc.data().apellidos;
                      this.terceroProvincial.pts = doc.data().puntuacion;
                      this.terceroProvincial.photo =
                        doc.data().fotoPerfil;
                    }
                  }
                }
              }
            }
          });
        });
    }
    return {
      obtenerRanking,
    };
  },
  watch: {
    $route(to, from) {
      this.primeroProvincial = { photo: "", name: "", pts: 0 },
      this.segundoProvincial = { photo: "", name: "", pts: 0 },
      this.terceroProvincial = { photo: "", name: "", pts: 0 },
      this.primeroRegional = { photo: "", name: "", pts: 0 },
      this.segundoRegional = { photo: "", name: "", pts: 0 },
      this.terceroRegional = { photo: "", name: "", pts: 0 },
      this.obtenerRanking();
    },
  },
  mounted() {
    this.obtenerRanking();
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
