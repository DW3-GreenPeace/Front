<!-- /pages/inicio/Inicio.vue -->
<template>
    <div>
      <About />
      <Banner />
      <Donation />
      <Location />
      <Partner />
      <Themes />
      <Volunteer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import About from './About.vue';
  import Banner from './Banner.vue';
  import Donation from './Donation.vue';
  import Location from './Location.vue';
  import Partner from './Partner.vue';
  import Themes from './Themes.vue';
  import Volunteer from './Volunteer.vue';
  
  export default defineComponent({
    components: {
      About,
      Banner,
      Donation,
      Location,
      Partner,
      Themes,
      Volunteer,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para a página inicial */
  </style>
  