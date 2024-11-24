<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import About from "./About.vue";
import Banner from "./Banner.vue";
import Donation from "./Donation.vue";
import Location from "./Location.vue";
import Partner from "./Partner.vue";
import Themes from "./Themes.vue";
import Volunteer from "./Volunteer.vue";

export default defineComponent({
  name: "Inicio",
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
  setup() {
    // Recupera os dados do localStorage sem converter para JSON novamente
    
  },
});
</script>

<template>
  <div>
    <Header which = 'usuario'/>
    <Banner />
    <About />
    <Themes />
    <Volunteer />
    <Donation />
    <Location />
    <Partner />
    <Footer />
  </div>
</template>
