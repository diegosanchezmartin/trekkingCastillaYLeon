<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="cargando">
      <ion-grid class="grid">
        <ion-row class="row">
          <ion-col class="col">
            <IconoSVGBlanco />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-header collapse="condense">
        <ion-item>
          <ion-button @click="goAddRoute()" color="medium">
            <ion-icon :icon="addCircleOutline" />
          </ion-button>
          <ion-toolbar>
            <ion-title size="large">Explora</ion-title>
          </ion-toolbar>
          <ion-searchbar animated></ion-searchbar>
        </ion-item>
      </ion-header>
      <ion-list class="listaRutas">
        <ion-item v-for="ruta in rutas" v-bind:key="ruta.id">
          <ion-card class="ruta">
            <ion-card-header>
              <ion-item>
                <ion-label>
                  <h4>{{ ruta.nombreRuta }}</h4>
                  <h3>
                    <ion-icon :icon="locationOutline" /> {{ ruta.infoRuta }}
                    {{ ruta.kilometros }} Kms
                  </h3>
                </ion-label>
              </ion-item>
            </ion-card-header>
            <ion-grid>
              <ion-row>
                <swiper
                  :modules="modules"
                  pager="true"
                  :options="slideOpts"
                  navigation
                  :pagination="{ clickable: true }"
                >
                  <swiper-slide
                    v-for="(photo, index) in ruta.imagenesIntroducidas"
                    :key="index"
                  >
                    <ion-img :src="photo" />
                  </swiper-slide>
                </swiper>
              </ion-row>
              <ion-row>
                <ion-col class="columnaComentarios">
                  <ion-button class="botonComentarios"
                    ><ion-icon :icon="heart"
                  /></ion-button>
                </ion-col>
                <ion-col class="columnaComentarios">
                  <ion-button
                    class="botonComentarios"
                    @click="setOpen(true, ruta.nombreRuta)"
                    ><ion-icon :icon="chatbubbles"
                  /></ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-card-content class="cardContent">
              <ion-item>
                <ion-avatar slot="end">
                  <img :src="ruta.fotoPerfilUsuarioIntroducida" />
                </ion-avatar>
                <ion-text color="dark">
                  <h3>{{ ruta.usuario }}</h3>
                  <h2>{{ ruta.nivelUsuario }}</h2>
                </ion-text>
                <ion-text color="medium"> </ion-text>
              </ion-item>
            </ion-card-content>
            <ion-footer>
              <ion-row>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="ruta.iconoIntroducido"></ion-icon>
                      {{ ruta.tipoRuta }}
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      {{ ruta.valoracion }} <ion-icon :icon="starOutline" />
                    </div>
                  </button>
                </ion-col>
                <ion-col center text-center>
                  <button>
                    <div>
                      <ion-icon :icon="timeOutline" />
                      {{ ruta.fechaPublicacion }}
                    </div>
                  </button>
                </ion-col>
              </ion-row>
            </ion-footer>
          </ion-card>
        </ion-item>
        <ion-modal
          :is-open="isOpen"
          ref="modal"
          :initial-breakpoint="0.35"
          :breakpoints="[0.25, 0.5, 0.75, 1]"
        >
          <ion-header>
            <ion-toolbar>
              <ion-title>Comentarios</ion-title>
              <ion-buttons slot="end">
                <ion-button color="light" @click="setOpen(false, null)"
                  >Cerrar</ion-button
                >
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-item class="itemComentario">
              <ion-label position="floating">Añade tu comentario</ion-label>
              <ion-input
                clear-input
                type="text"
                v-model="comentarioIntroducido"
              ></ion-input
              ><ion-icon
                :icon="arrowDownCircleOutline"
                slot="end"
                @click="anadirComentario()"
              />
            </ion-item>
            <ion-list class="list">
              <ion-item
                v-for="comentario in comentariosMostrados"
                v-bind:key="comentario.id"
                class="item"
              >
                <ion-avatar class="avatar" slot="start">
                  <ion-img :src="comentario.fotoPerfilUsuario"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h5>{{ comentario.creador }}: {{ comentario.comentario }}</h5>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  toRefs,
} from "vue";
import { db, auth } from "@/main";
import { collection, getDocs } from "@firebase/firestore";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonAvatar,
  IonFooter,
  IonCol,
  IonRow,
  IonIcon,
  IonText,
  IonImg,
  IonSearchbar,
  IonGrid,
  IonModal,
  IonInput,
} from "@ionic/vue";
import {
  starOutline,
  timeOutline,
  resizeOutline,
  repeatOutline,
  flagOutline,
  analyticsOutline,
  addCircleOutline,
  searchOutline,
  locationOutline,
  heart,
  chatbubbles,
  arrowDownCircleOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
import iconoSVGBlanco from "../components/IconoSVGBlanco.vue";
import iconoSVGNegro from "../components/IconoSVGNegro.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@ionic/vue/css/ionic-swiper.css";
import IconoSVGBlanco from "../components/IconoSVGBlanco.vue";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "Tab1Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonButtons,
    IonItem,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    IonAvatar,
    IonFooter,
    IonCol,
    IonRow,
    IonIcon,
    IonText,
    Swiper,
    SwiperSlide,
    IonImg,
    iconoSVGBlanco,
    IonSearchbar,
    IonGrid,
    IonModal,
    IonInput,
    IconoSVGBlanco,
  },
  data() {
    return {
      cargando: false,
      isOpen: false,
      darkMode: false,
      comentarioIntroducido: "",
      nombreRuta2: "",
      comentariosMostrados: [],
    };
  },
  methods: {
    setOpen(isOpen: boolean, nombreRuta: string) {
      this.nombreRuta = nombreRuta;
      this.rutas.forEach((ruta) => {
        if (ruta.nombreRuta === nombreRuta) {
          this.comentariosMostrados = ruta.comentarios;
        }
      });
      this.isOpen = isOpen;

      if (isOpen == false) {
        this.comentariosMostrados = [];
      }

      console.log(this.nombreRuta);
      console.log(this.comentariosMostrados);
    },
  },
  setup() {
    const state = reactive({
      rutas: [],
    });
    const ionRouter = useIonRouter();
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const goAddRoute = async () => {
      ionRouter.push("/tabs/anadirRutaNueva");
    };
    async function anadirComentario() {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          const current = new Date();

          const id = uuidv4();

          db.collection("rutas")
            .doc(this.nombreRuta)
            .collection("comentarios")
            .doc(id)
            .set({
              creador: auth.currentUser.displayName,
              comentario: this.comentarioIntroducido,
              fechaPublicacion: `${current.getDate()}/${
                current.getMonth() + 1
              }/${current.getFullYear()}`,
              fotoPerfilUsuario: result.data().fotoPerfil,
            });

          console.log("Comentario introducido en la ruta: " + this.nombreRuta);
          this.comentarioIntroducido = "";
        });
    }

    async function obtenerRutasDisponibles() {
      this.cargando = true;
      var fotoUsuario;
      db.collection("rutas")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var comentarios = [];
            db.collection("users")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((docFoto) => {
                  if (docFoto.data().email == doc.data().emailUsuario) {
                    fotoUsuario = docFoto.data().fotoPerfil;
                  }
                });

                if (doc.data().tipoRuta == "rutaCircular") {
                  db.collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          comentario: ruta.data().comentario,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    infoRuta: doc.data().infoRuta,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: doc.data().nivelUsuarioIntroducido,
                    tipoRuta: "Circular",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: repeatOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                } else if (doc.data().tipoRuta == "rutaLineal") {
                  db.collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          comentario: ruta.data().comentario,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    infoRuta: doc.data().infoRuta,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: doc.data().nivelUsuarioIntroducido,
                    tipoRuta: "Lineal",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: resizeOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                }
                if (doc.data().tipoRuta == "ascension") {
                  db.collection("rutas")
                    .doc(doc.data().nombreRuta)
                    .collection("comentarios")
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((ruta) => {
                        comentarios.push({
                          comentario: ruta.data().comentario,
                          creador: ruta.data().creador,
                          fechaPublicacion: ruta.data().fechaPublicacion,
                          fotoPerfilUsuario: ruta.data().fotoPerfilUsuario,
                        });
                      });
                    });
                  state.rutas.push({
                    id: doc.id,
                    nombreRuta: doc.data().nombreRuta,
                    infoRuta: doc.data().infoRuta,
                    imagenesIntroducidas: doc.data().imagenesIntroducidas,
                    usuario: doc.data().usuarioIntroducido,
                    nivelUsuario: doc.data().nivelUsuarioIntroducido,
                    tipoRuta: "Ascension",
                    valoracion: doc.data().valoracion,
                    kilometros: doc.data().kilometros,
                    fotoPerfilUsuarioIntroducida: fotoUsuario,
                    iconoIntroducido: flagOutline,
                    fechaPublicacion: doc.data().fechaPublicacion,
                    emailRuta: doc.data().emailUsuario,
                    comentarios: comentarios,
                  });
                }

                console.log(doc.id, " => ", doc.data());
              });
          });
        });

      this.cargando = false;
      console.log("Estas son las rutas: ");
      console.log(state.rutas);
    }

    return {
      obtenerRutasDisponibles,
      anadirComentario,
      ...toRefs(state),
      timeOutline,
      starOutline,
      resizeOutline,
      repeatOutline,
      flagOutline,
      analyticsOutline,
      addCircleOutline,
      searchOutline,
      locationOutline,
      heart,
      chatbubbles,
      arrowDownCircleOutline,
      slideOpts,
      goAddRoute,
      modules: [Navigation, Pagination],
    };
  },
  watch: {
    $route(to, from) {
      this.rutas = [];
      this.obtenerRutasDisponibles();
    },
  },
  mounted() {
    this.obtenerRutasDisponibles();
  },
});
</script>

<style scoped>
ion-modal {
  --border-radius: 16px;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

.cardContent {
  padding-top: 0px;
}
.itemComentario {
  align-items: center;
}
.item {
  padding: 0% 0% 2% 0%;
}

.list {
  padding: 3%;
}
.avatar {
  margin-inline: 0px 12px;
}
.botonComentarios {
  width: 80%;
}
.columnaComentarios {
  display: flex;
  justify-content: center;
}
.grid {
  display: flex;
  height: 100%;
  align-items: center;
}
.col {
  display: flex;
  justify-content: center;
}
.row {
  width: 100%;
}
.ruta {
  width: 100%;
}
.swiper-pagination-bullet {
  background: black;
  opacity: 0.4;
}

.swiper-pagination-bullet-active {
  background: white;
}
</style>
