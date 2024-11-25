<template>
  <div class="container">
    <h2>Painel Administrativo</h2>
    <p>Escolha uma opção:</p>
    <ul>
      <li>
        <div class="card">
          <h1>Campanhas</h1>
          <div class="info">
            <p>Aqui a adiminstração poderá ver, criar, editar e expluir uma campanha</p>
          </div>
          <button>
            <router-link to="/campaigns/list" class="link">Gerenciar Campanhas</router-link>
          </button>
        </div>
      </li>
      <li>
        <div class="card">
          <h1>Voluntários</h1>
          <div class="info">
            <p>Aqui a adiminstração poderá ver, criar, editar e expluir uma campanha</p>
          </div>
          <button>
            <router-link to="/volunteers">Gerenciar Voluntários</router-link>
          </button>
        </div>
      </li>
      <li>
        <div class="card">
          <h1>Relatório</h1>
          <div class="info">
            <p>Acompanhar os pagamentos das doações</p>
          </div>
          <button>
            <router-link to="/donations">Ver Relatório</router-link>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

a,
h1,
p,
h2,
h3,
label {
  font-family: "Poppins", serif;
}

li,
a {
  text-decoration: none;
  list-style: none;
  color: aliceblue;
}

ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;
  height: 250px;
  background-color: rgb(255, 255, 255);
  margin: 20px;
  border-radius: 10px;
  border: 1px solid rgb(231, 221, 221);
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(1, 121, 177);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.info{
  /* border: 1px solid grey; */
  border-radius: 9px;
  position: relative;
  bottom: 20px;
}
</style>