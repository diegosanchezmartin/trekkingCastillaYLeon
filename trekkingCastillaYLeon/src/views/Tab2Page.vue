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
      <div class="map" ref="mapDivRef">

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { ref, onBeforeMount } from "vue";

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    /*const map = ref(null);

    const mapDivRef = ref(null);

    onBeforeMount(() => {
      const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

      const googleMapScript = document.createElement("SCRIPT");
      googleMapScript.setAttribute(
        "src",
        'https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap'
      );

      googleMapScript.setAttribute("defer", "");
      googleMapScript.setAttribute("async", "");
      document.head.appendChild(googleMapScript);
    })

    window.initMap = () => {
      map.value = new google.maps.Map(mapDivRef.value, {
        mapTypeId : 'hybrid'
      });
    }

    return{
      mapDivRef
    };*/
  }
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
  background-color: azure;
}
</style>
