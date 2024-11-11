<template>
    <div>
      <h2>Painel Administrativo</h2>
      <p>Escolha uma opção:</p>
      <ul>
        <li><router-link to="/admin/campaigns">Gerenciar Campanhas</router-link></li>
        <li><router-link to="/admin/volunteers">Gerenciar Voluntários</router-link></li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({});
  </script>
  