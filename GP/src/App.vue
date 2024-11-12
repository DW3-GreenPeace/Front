<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
})
</script>

<style>
#app{
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  background-color: aliceblue;
  width: auto;
  
}

p, h3, h2, h1{
  color: black;
}
</style>
