import { createStore } from "vuex";
import { resizeOutline, repeatOutline, flagOutline } from "ionicons/icons";
import { db } from "../main";

export const store = createStore({
  state() {
    return {
      rutas: [
        {
          id: 1,
          nombreRuta: "Ruta de las fuentes medicinales",
          infoRuta: "Noceda del Bierzo",
          imagenes: [
            {
              webviewPath: require("../pictures/IMG_0797.jpg"),
            },
            {
              webviewPath: require("../pictures/IMG_1303.jpg"),
            },
            {
              webviewPath: require("../pictures/IMG_0833.jpg"),
            },
          ],
          usuario: "Diego Sánchez Martín",
          nivelUsuario: "Novato",
          tipoRuta: "Lineal",
          valoracion: "4,3",
          tiempoPublicacion: "hace 3 horas",
          kilometros: "14,84",
          fotoPerfilUsuario: require("../pictures/FotoPerfil1.jpg"),
          icono: resizeOutline,
        },
        {
          id: 2,
          nombreRuta: "Ascensión al Pico de la Aquiana",
          infoRuta: "Campo de las Danzas 14,18kms +15ptos",
          imagenes: [
            {
              webviewPath: require("../pictures/IMG_0955.jpg"),
            },
            {
              webviewPath: require("../pictures/IMG_0695.jpg"),
            },
            {
              webviewPath: require("../pictures/IMG_0785.jpg"),
            },
          ],
          usuario: "Martín Fernández Maroto",
          nivelUsuario: "Pateador de campeonato",
          tipoRuta: "Circular",
          valoracion: "4,8",
          tiempoPublicacion: "hace 6 horas",
          kilometros: "10",
          fotoPerfilUsuario: require("../pictures/FotoPerfil2.jpg"),
          icono: repeatOutline,
        },
      ],
    };
  },
  actions: {
    anadirRuta(contexto, memoryData) {
      contexto.commit("anadirRuta", memoryData);
    },
  },
  getters: {
    rutas(state: any) {
      return state.rutas;
    },
    rutasPerfil(state: any) {
      return function (args: any) {
        console.log(args);
      };
    },
  },
  mutations: {
    anadirRuta(state: any, memoryData: any) {
      if (memoryData.tipoRuta == "rutaLineal") {
        const nuevaRuta = {
          id: new Date().toISOString(),
          nombreRuta: memoryData.nombreRuta,
          infoRuta: memoryData.infoRuta,
          imagenes: memoryData.imagenesIntroducido,
          usuario: memoryData.usuarioIntroducido,
          nivelUsuario: memoryData.nivelUsuarioIntroducido,
          tipoRuta: "Lineal",
          valoracion: memoryData.valoracion.substring(0, 1),
          //tiempoPublicacion: "hace 6 horas",
          kilometros: memoryData.kilometros,
          //fotoPerfilUsuario: require("../pictures/FotoPerfil2.jpg"),
          icono: resizeOutline,
        };

        console.log("index");
        console.log(nuevaRuta);

        state.rutas.unshift(nuevaRuta);
      } else if (memoryData.tipoRuta == "rutaCircular") {
        const nuevaRuta = {
          id: new Date().toISOString(),
          nombreRuta: memoryData.nombreRuta,
          infoRuta: memoryData.infoRuta,
          imagenes: memoryData.imagenesIntroducido,
          usuario: memoryData.usuarioIntroducido,
          nivelUsuario: memoryData.nivelUsuarioIntroducido,
          tipoRuta: "Circular",
          valoracion: memoryData.valoracion.substring(0, 1),
          //tiempoPublicacion: "hace 6 horas",
          kilometros: memoryData.kilometros,
          //fotoPerfilUsuario: require("../pictures/FotoPerfil2.jpg"),
          icono: repeatOutline,
        };

        console.log("index");
        console.log(nuevaRuta);

        state.rutas.unshift(nuevaRuta);
      } else if (memoryData.tipoRuta == "ascension") {
        const nuevaRuta = {
          id: new Date().toISOString(),
          nombreRuta: memoryData.nombreRuta,
          infoRuta: memoryData.infoRuta,
          imagenes: memoryData.imagenesIntroducido,
          usuario: memoryData.usuarioIntroducido,
          nivelUsuario: memoryData.nivelUsuarioIntroducido,
          tipoRuta: "Ascensión",
          valoracion: memoryData.valoracion.substring(0, 1),
          //tiempoPublicacion: "hace 6 horas",
          kilometros: memoryData.kilometros,
          //fotoPerfilUsuario: require("../pictures/FotoPerfil2.jpg"),
          icono: flagOutline,
        };

        console.log("index");
        console.log(nuevaRuta);
        state.rutas.unshift(nuevaRuta);
      } else {
        console.log("banana");
      }
    },
  },
});

export default store;
