<template>
  <div class="heading">
    <h1>{{titulo}}</h1>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'NavBar',
  props: {
    titulo: String,
  }
});
</script>

<style scoped>
.heading {
  margin: 0;
  padding: 0px;
  background-color: black;
  color: white;
}

.heading > h1 {
  font-size: small;
  padding: 5px;
  margin: 0;
  text-align: center;
}
</style>