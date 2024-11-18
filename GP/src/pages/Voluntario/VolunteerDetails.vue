<template>
  <div class="container">
    <h1>Detalhes do Voluntário</h1>
    <div class="add-voltar">
      <router-link to="/admin">
        <button class="btn-back">Voltar Para a Admistração</button>
          </router-link>
    </div>
    <div v-if="volunteer" class="voluntario">
      <p><strong>Nome:</strong> {{ volunteer.name }}</p>
      <p><strong>Email:</strong> {{ volunteer.email }}</p>
      <p><strong>Idade:</strong> {{ volunteer.age }}</p>
      <p><strong>Habilidades:</strong> {{ volunteer.skills.join(', ') }}</p>
      <p><strong>Disponibilidade:</strong> {{ volunteer.availability }}</p>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Volunteer } from '../../types/volunteer';
  import { getVolunteerById } from '../../services/volunteerService';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const volunteer = ref<Volunteer | null>(null);
      const router = useRoute();
      const id = Number(router.params.id);
  
      onMounted(async () => {
        volunteer.value = await getVolunteerById(id) || null;
      });
      return { volunteer };
    }
  });
  </script>
  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

a,
h1,
p,
h2,
h3,
label,
span,
td, th {
  font-family: "Poppins", serif;
}
  /* Container geral */
  .container{
    height: 80dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .voluntario {
    padding: 20px;
    width: 80%;
    margin: auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .add-voltar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-voltar button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 15px;
}

.btn-back {
  background-color: #0396f8;
}

.btn-back:hover {
  background-color: #0095c2;
}
  /* Cabeçalho */
  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 2px solid #4a90e2;
    padding-bottom: 5px;
  }
  
  /* Estilos do parágrafo */
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin: 10px 0;
  }
  
  /* Destacar rótulos */
  strong {
    font-weight: bold;
    color: #333;
  }
  
  /* Adicionar espaçamento entre as linhas de informação */
  p:not(:last-child) {
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }
  </style>
  