<template>
  <header class="header">
    <h1 class="logo">GreenPeace</h1>
    <nav>
      <ul>
        <RouterLink to="/" class="link" :class="{ active: activeLink === 'inicio' }" click="setActiveLink('inicio')">Início</RouterLink>
        <RouterLink to="/" class="link" :class="{ active: activeLink === '' }" click="setActiveLink('')">Sobre</RouterLink>
        <RouterLink to="/campanha/list" class="link" :class="{ active: activeLink === '' }" click="setActiveLink('')">Campanha</RouterLink>
        <RouterLink to="" class="link" :class="{ active: activeLink === '' }" click="setActiveLink('')">Contato</RouterLink>
        <RouterLink to="/login" class="link" :class="{ active: activeLink === 'login' }" click="setActiveLink('')">Entrar</RouterLink>
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'Header',

  data() {
    return {
      activeLink: 'inicio', // Define o link inicial como 'home'
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link; // Atualiza o link ativo
    },
  },
}
</script>

<style scoped>
a, li{
  color: #fff;
  text-decoration: none;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

.header {
  background-color: #004d00;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
}

nav ul {
  display: flex;
  gap: 20px;
}

.logo{
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>