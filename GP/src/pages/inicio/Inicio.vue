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
    const userData = localStorage.getItem("usuario");
    const user = ref(userData || null); // Atribui diretamente

    // Define o tipo do header com base no papel do usuário
    const which = ref(
      user.value?.role === "adm"
        ? "adm"
        : user.value?.role === "usuario"
        ? "usuario"
        : ""
    );

    return {
      which,
    };
  },
});
</script>

<template>
  <div>
    <Header :which="which" />
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
