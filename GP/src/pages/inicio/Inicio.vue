<!-- /pages/inicio/Inicio.vue -->
<template>
    <div>
      <Header />
      <About />
      <Banner />
      <Donation />
      <Location />
      <Partner />
      <Themes />
      <Volunteer />
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Header from '../../components/Header.vue';
  import Footer from '../../components/Footer.vue'; 
  import About from './About.vue'; 
  import Banner from './Banner.vue';
  import Donation from './Donation.vue';
  import Location from './Location.vue';
  import Partner from './Partner.vue';
  import Themes from './Themes.vue';
  import Volunteer from './Volunteer.vue';
  
  export default defineComponent({
    name: 'Inicio', 
    components: {
      Header,
      About,
      Banner,
      Donation,
      Location,
      Partner,
      Themes,
      Volunteer,
      Footer,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para a página inicial */
  </style>
  