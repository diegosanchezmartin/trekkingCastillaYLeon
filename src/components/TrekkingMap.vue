<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Map, NavigationControl, GeolocateControl } from "maplibre-gl";
import {
  shallowRef,
  onMounted,
  onUnmounted,
  markRaw,
  defineComponent,
} from "vue";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default defineComponent({
  name: "TrekkingMap",
  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    onMounted(() => {
      const apiKey = "HMe7WC55sZcFwJmppiRb";
      const mapBoxToken =
        "pk.eyJ1IjoiZGllZ29zbmNoZXptYXJ0aW4iLCJhIjoiY2w0Y3M2cGdnMDFpODNlbXUyYWdoZ3gxayJ9.tbbUxPlHTXetwBXMFoLU8w";

      const initialState = { lng: -6.5663177, lat: 42.4984435, zoom: 14 };

      map.value = markRaw(
        new Map({
          container: mapContainer.value,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        })
      );

      const geocoder = new MapboxGeocoder({
        accessToken: mapBoxToken,
        mapboxgl: map,
      });

      map.value.addControl(new NavigationControl(), "top-right");
      map.value.addControl(new GeolocateControl(), "top-right");
      map.value.addControl(geocoder, "top-left");
    }),
      onUnmounted(() => {
        map.value?.remove();
      });

    return {
      map,
      mapContainer,
    };
  },
});
</script>


<style scoped>
@import "~maplibre-gl/dist/maplibre-gl.css";

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    50vh - 77px
  ); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>