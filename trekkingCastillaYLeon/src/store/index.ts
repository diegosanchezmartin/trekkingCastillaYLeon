import { createStore } from "vuex";
import { resizeOutline, repeatOutline } from "ionicons/icons";

export const store = createStore({
  state() {
    return {
      rutas: [
        {
          id: 1,
          nombreRuta: "Ruta de las fuentes medicinales",
          infoRuta: "Noceda del Bierzo",
          imagenes: [
            require("../pictures/IMG_0797.jpg"),
            require("../pictures/IMG_1303.jpg"),
            require("../pictures/IMG_0833.jpg"),
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
            require("../pictures/IMG_0955.jpg"),
            require("../pictures/IMG_0695.jpg"),
            require("../pictures/IMG_0785.jpg"),
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
  },
  mutations: {
    anadirRuta(state: any, memoryData: any) {
      const nuevaRuta = {
        id: new Date().toISOString(),
        nombreRuta: memoryData.nombreRuta,
        infoRuta: memoryData.infoRuta,
        /*imagenes: [
                      require("../pictures/IMG_0955.jpg"),
                      require("../pictures/IMG_0695.jpg"),
                      require("../pictures/IMG_0785.jpg"),
                  ],*/

        //usuario: memoryData.usuario,
        /*nivelUsuario: "Pateador de campeonato",*/
        tipoRuta: memoryData.tipoRuta,
        valoracion: memoryData.valoracion,
        //tiempoPublicacion: "hace 6 horas",
        kilometros: memoryData.kilometros,
        //fotoPerfilUsuario: require("../pictures/FotoPerfil2.jpg"),

        //icono:
      };

      state.rutas.unshift(nuevaRuta);
    },
  },
});

export default store;
