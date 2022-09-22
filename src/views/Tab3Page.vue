<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Perfil</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-menu side="start" menu-id="menu" content-id="main">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Ajustes</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item @click="setModalDatos(true)">Datos cuenta</ion-item>
            <ion-item @click="setModalAyuda(true)">Ayuda</ion-item>
            <ion-item @click="cerrarSesion()">Cerrar sesión</ion-item>
          </ion-list>
          <ion-modal :is-open="modalDatos">
            <ion-header>
              <ion-toolbar>
                <ion-title>Cuenta</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setModalDatos(false)">Cerrar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <h4>
                Datos almacenados:
              </h4>
              <p>
                Nombre: {{ this.usuarioDatos.nombre }}
              </p>
              <p>
                Apellidos: {{ this.usuarioDatos.apellidos }}
              </p>
              <p>
                Fecha de alta: {{ this.usuarioDatos.fechaAlta }}
              </p>
              <p>
                Información del usuario: {{ this.usuarioDatos.infoUsuario }}
              </p>
              <p>
                Nombre de usuario: {{ this.usuarioDatos.nombreUsuario }}
              </p>
              <p>
                Provincia: {{ this.usuarioDatos.provincia }}
              </p>
            </ion-content>
          </ion-modal>
          <ion-modal :is-open="modalAyuda">
            <ion-header>
              <ion-toolbar>
                <ion-title>Ayuda</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="setModalAyuda(false)">Cerrar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <h4>
                Bienvenido a la sección de ayuda de la aplicación trekkingCastillaYLeon.
              </h4>
              <p>
                Si tiene cualquier tipo de sugerencia o necesata ayuda, no dude en contactarnos en el siguiente correo electrónico:
              </p>
              <h4>
                trekkingcastillayleon@gmail.com
              </h4>
            </ion-content>
          </ion-modal>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main"></ion-router-outlet>
      <ion-card>
        <swiper
          :modules="modules"
          pager="true"
          :options="slideOpts"
          navigation
          :pagination="{ clickable: true }"
        >
          <swiper-slide>
            <img :src="imagenPerfil" />
          </swiper-slide>
          <swiper-slide>
            <ion-grid>
              <ion-row class="filaRutas">
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="primary"
                        >Rutas</ion-label
                      >
                    </ion-row>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="primary"
                        >realizadas:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="primary">
                      {{ rutasRealizadas }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="secondary"
                        >Rutas</ion-label
                      >
                    </ion-row>

                    <ion-row>
                      <ion-label class="etiquetaRutas" color="secondary"
                        >añadidas:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="secondary">
                      {{ rutasAnadidas }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="tertiary"
                        >Rutas</ion-label
                      >
                      <ion-row> </ion-row>
                      <ion-label class="etiquetaRutas" color="tertiary"
                        >modificadas:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="tertiary">
                      {{ rutasModificadas }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
              </ion-row>
              <ion-row class="filaRutas">
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="dark"
                        >Puntos</ion-label
                      >
                      <ion-row> </ion-row>
                      <ion-label class="etiquetaRutas" color="dark"
                        >conseguidos:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="dark">
                      {{ puntosUser }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="medium"
                        >Nivel</ion-label
                      >
                    </ion-row>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="medium"
                        >usuario:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="medium">
                      {{ nivelUser }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
                <ion-card class="columnaRutas">
                  <ion-card-header>
                    <ion-row>
                      <ion-label class="etiquetaRutas" color="dark"
                        >Provincia</ion-label
                      >
                      <ion-row> </ion-row>
                      <ion-label class="etiquetaRutas" color="dark"
                        >usuario:</ion-label
                      >
                    </ion-row>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-label class="etiquetaRutas" color="dark">
                      {{ provinciaUser }}
                    </ion-label>
                  </ion-card-content>
                </ion-card>
              </ion-row>
            </ion-grid>
          </swiper-slide>
        </swiper>
        <ion-card-header>
          <ion-card-subtitle>{{ nivelUser }}</ion-card-subtitle>
          <div class="informacionUsuario" v-if="!modificando">
            <ion-card-title>{{ nombreUser }}</ion-card-title>
          </div>
          <div class="informacionUsuario" v-else>
            <ion-input
              type="text"
              maxlength="22"
              v-model="nuevoNombreIntroducido"
              class="inputEditarInfoNombre"
            ></ion-input>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <div class="informacionUsuario" v-if="!modificando">
                <ion-label>
                  {{ infoUsuario }}
                </ion-label>
              </div>
              <div class="informacionUsuario" v-else>
                <ion-input
                  type="text"
                  maxlength="110"
                  v-model="nuevaInfoIntroducida"
                  class="inputEditarInfo"
                ></ion-input>
              </div>
            </ion-row>
            <ion-row class="filaPerfilAjustes">
              <ion-col class="columnaPerfil">
                <ion-button
                  v-if="!modificando"
                  @click="botonEditar()"
                  class="botonPerfil"
                  color="medium"
                >
                  Editar perfil
                </ion-button>
                <ion-button
                  v-else
                  @click="botonEditar()"
                  class="botonPerfil"
                  color="success"
                >
                  <ion-icon :icon="checkmark"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col class="columnaPerfil">
                <ion-button
                  class="botonPerfil"
                  color="medium"
                  @click="botonAjustes()"
                >
                  Ajustes
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>

        <ion-card class="contenedorRutas">
          <ion-card-header>
            <ion-card-subtitle class="tiposRutas"
              ><ion-icon class="elipseRealizadas" :icon="ellipse" /> Realizadas
              <ion-icon class="elipseAnadidas" :icon="ellipse" /> Añadidas
              <ion-icon class="elipseModificadas" :icon="ellipse" />
              Modificadas</ion-card-subtitle
            >
          </ion-card-header>
          <ion-card-content>
            <ion-grid>
              <ion-row size="4">
                <ion-col size="4" v-for="ruta in rutas" v-bind:key="ruta.id">
                  <swiper
                    class="swiperAnadida"
                    pager="true"
                    :options="slideOpts"
                    v-if="ruta.estado == 'anadida'"
                  >
                    <swiper-slide
                      v-for="(imagen, index) in ruta.fotos"
                      v-bind:key="index"
                    >
                      <ion-img :src="imagen" />
                    </swiper-slide>
                  </swiper>
                  <swiper
                    class="swiperRealizada"
                    pager="true"
                    :options="slideOpts"
                    v-else-if="ruta.estado == 'realizada'"
                  >
                    <swiper-slide
                      v-for="(imagen, index) in ruta.fotos"
                      v-bind:key="index"
                    >
                      <ion-img :src="imagen" />
                    </swiper-slide>
                  </swiper>
                  <swiper
                    class="swiperModificada"
                    pager="true"
                    :options="slideOpts"
                    v-else-if="ruta.estado == 'modificada'"
                  >
                    <swiper-slide
                      v-for="(imagen, index) in ruta.fotos"
                      v-bind:key="index"
                    >
                      <ion-img :src="imagen" />
                    </swiper-slide>
                  </swiper>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { doc, getDoc } from "@firebase/firestore";
import {
  ellipse,
  checkmark,
  cog,
  contrast,
  pencil,
  informationOutline,
  alert,
  moon,
} from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonButton,
  IonCol,
  IonRow,
  IonImg,
  IonInput,
  IonIcon,
  IonCardContent,
  IonGrid,
  IonCardSubtitle,
  IonCardTitle,
  menuController,
  IonMenu,
  IonRouterOutlet,
  IonModal,
} from "@ionic/vue";

import { auth, db } from "@/main";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@ionic/vue/css/ionic-swiper.css";

export default defineComponent({
  name: "Tab3Page",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonLabel,
    IonButton,
    IonCol,
    IonRow,
    Swiper,
    SwiperSlide,
    IonImg,
    IonInput,
    IonIcon,
    IonCardContent,
    IonGrid,
    IonCardSubtitle,
    IonCardTitle,
    IonMenu,
    IonRouterOutlet,
    IonModal,
  },
  data() {
    return {
      nuevoNombreIntroducido: "",
      nuevaInfoIntroducida: "",
      modificando: false,
      rutasRealizadas: 0,
      rutasAnadidas: 0,
      rutasModificadas: 0,
      modalDatos: false,
      modalAyuda: false,
      usuarioDatos: [],
    };
  },
  methods: {
    async setModalDatos(isOpen: boolean){
      if(this.modalDatos == false) {
        await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((result) => {
            if (result.id == auth.currentUser.uid) {
              this.usuarioDatos.nombre = result.data().nombre;
              this.usuarioDatos.apellidos = result.data().apellidos;
              this.usuarioDatos.fechaAlta = result.data().fechaAlta;
              this.usuarioDatos.infoUsuario = result.data().infoUsuario;
              this.usuarioDatos.nombreUsuario = result.data().nombreUsuario;
              this.usuarioDatos.provincia = result.data().provincia;
            }
          });
        });
      }
      this.modalDatos = isOpen;
    },
    setModalAyuda(isOpen: boolean){
      this.modalAyuda = isOpen;
    }
  },
  setup() {
    const state = reactive({
      rutas: [],
      nombreUser: "",
      imagenPerfil: "",
      puntosUser: 0,
      nivelUser: "",
      provinciaUser: "",
      infoUsuario: "",
    });
    const currentUser = auth.currentUser;
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    async function cerrarSesion() {
      auth.signOut().then(() => {
        this.$router.go("/");
      });
    }
    async function botonEditar() {
      if (this.modificando == false) {
        this.modificando = true;
      } else {
        console.log(this.nuevoNombreIntroducido);
        console.log(this.nuevaInfoIntroducida);
        if (this.nuevoNombreIntroducido != "") {
          state.nombreUser = this.nuevoNombreIntroducido;
          await db.collection("users").doc(auth.currentUser.uid).update({
            nombre: this.nuevoNombreIntroducido,
          });
        }
        if (this.nuevaInfoIntroducida != "") {
          state.infoUsuario = this.nuevaInfoIntroducida;
          await db.collection("users").doc(auth.currentUser.uid).update({
            infoUsuario: this.nuevaInfoIntroducida,
          });
        }
        this.modificando = false;
      }
    }
    async function botonAjustes() {
      menuController.enable(true, "menu");
      menuController.open("menu");
    }
    async function obtenerRutasUsuario() {
      const contadores = await doc(db, "users", auth.currentUser.uid);
      const querySnapshot = await getDoc(contadores);
      const infoUsuario = querySnapshot.data();
      this.rutasRealizadas = infoUsuario.rutasRealizadas;
      this.rutasModificadas = infoUsuario.rutasModificadas;
      this.rutasAnadidas = infoUsuario.rutasAnadidas;

      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((result) => {
          state.imagenPerfil = result.data().fotoPerfil;
          state.nombreUser =
            result.data().nombre + " " + result.data().apellidos;
          state.puntosUser = result.data().puntuacion;
          state.provinciaUser = result.data().provincia;
          state.infoUsuario = result.data().infoUsuario;
          if (result.data().puntuacion <= 10) {
            state.nivelUser = "Novat@";
          } else if (
            result.data().puntuacion > 10 &&
            result.data().puntuacion <= 20
          ) {
            state.nivelUser = "Caminante";
          } else if (
            result.data().puntuacion > 20 &&
            result.data().puntuacion <= 35
          ) {
            state.nivelUser = "Intrépid@";
          } else if (
            result.data().puntuacion > 35 &&
            result.data().puntuacion <= 50
          ) {
            state.nivelUser = "Ruter@";
          } else if (
            result.data().puntuacion > 50 &&
            result.data().puntuacion <= 70
          ) {
            state.nivelUser = "Expert@";
          } else if (result.data().puntuacion > 70) {
            state.nivelUser = "Pro";
          }
        });

      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .collection("rutasUsuario")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((collection) => {
            state.rutas.push({
              estado: collection.data().estadoRuta,
              fotos: collection.data().imagenesIntroducidas,
            });
          });
        });
    }
    return {
      obtenerRutasUsuario,
      botonEditar,
      botonAjustes,
      cerrarSesion,
      ...toRefs(state),
      currentUser,
      slideOpts,
      modules: [Navigation, Pagination],
      ellipse,
      checkmark,
      cog,
      pencil,
      contrast,
      informationOutline,
      alert,
      moon,
    };
  },
  watch: {
    $route(to, from) {
      this.rutas = [];
      this.obtenerRutasUsuario();
    },
  },
  mounted() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.modoOscuro = prefersDark.matches;
    this.obtenerRutasUsuario();
  },
});
</script>

<style scoped>
.inputEditarInfoNombre {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  border: 2px solid black;
}
.inputEditarInfo {
  border: 2px solid black;
}
.informacionUsuario {
  width: 100%;
}
.swiperRealizada {
  border: 3px solid green;
}

.swiperModificada {
  border: 3px solid darkRed;
}

.swiperAnadida {
  border: 3px solid orange;
}
.elipseRealizadas {
  color: green;
}
.elipseAnadidas {
  color: orange;
}
.elipseModificadas {
  color: darkred;
}
.contenedorRutas {
  margin: 0% 2% 2% 2%;
}
.tiposRutas {
  font-size: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.filaPerfilAjustes {
  padding: 5% 0% 0% 0;
}
.botonPerfil {
  width: 80%;
}
.columnaPerfil {
  display: flex;
  justify-content: center;
}
.infoUser {
  width: 100%;
}
.item-native {
  padding-inline: 2%;
}

.item-inner {
  padding-inline: 2%;
}
.cabeceraRutas {
  padding: 0px;
  padding-inline: 0px;
}
.filaRutas {
  display: flex;
  justify-content: space-between;
}
.columnaRutas {
  width: 31%;
  margin: 4px;
}
.etiquetaRutas {
  font-size: x-small;
}
</style>
