import { createStore } from 'vuex';

export const store = createStore({
    state() {
        return {
            rutas: [
            {
                id: 1,
                nombreRuta: "Ascensión al Pico de la Aquiana",
                infoRuta: "Campo de las Danzas 14,18kms +15ptos",
                imagenes: [
                    "../pictures/IMG_0955.jpg",
                    "../pictures/IMG_0695.jpg",
                    "../pictures/IMG_0785.jpg",
                ],
                usuario: "Martín Fernández Maroto",
                nivelUsuario: "Pateador de campeonato",
                tipoRuta: "Circular",
                valoracion: "4,8",
                tiempoPublicacion: "hace 6 horas",
            }]
        }
    },
    actions : {
         anadirRuta({commit}) {
             commit("anadirRuta")
         }
    },
    mutations : {
        anadirRuta(state: any, memoryData) {
            const nuevaRuta = {
                id: new Date().toString(),
                nombreRuta: memoryData.nombreRuta,
                infoRuta: memoryData.infoRuta,
                imagenes: memoryData.imagenes,
                usuario: memoryData.usuario,
                nivelUsuario: memoryData.nivelUsuario,
                tipoRuta: memoryData.tipoRuta,
                valoracion: memoryData.valoracion,
                tiempoPublicacion: memoryData.tiempoPublicacion
            };

            state.rutas.unshitf(nuevaRuta);  
        }
    }
})

export default store;