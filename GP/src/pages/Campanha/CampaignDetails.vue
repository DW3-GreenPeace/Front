<template>
    <Header />
    <div>
      <h2>Detalhes da Campanha</h2>
      <p><strong>Título:</strong> {{ campaign?.title }}</p>
      <p><strong>Descrição:</strong> {{ campaign?.description }}</p>
      <p><strong>Data de Início:</strong> {{ campaign?.startDate }}</p>
      <p><strong>Data de Término:</strong> {{ campaign?.endDate }}</p>
  
      <h3>Voluntários</h3>
      <ul>
        <li v-for="volunteer in campaign?.volunteers" :key="volunteer.id">
          {{ volunteer.name }} - {{ volunteer.email }}
        </li>
      </ul>
  
      <button @click="goBack">Voltar</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Campaign } from '../../types/campaign';
  import { getCampaignById } from '../../services/campaignService';
  import { useRoute, useRouter } from 'vue-router';
  import Header from '../../components/Header.vue'
  
  export default defineComponent({

    components: {
      Header,
    },

    setup() {
      const route = useRoute();
      const router = useRouter();
      const campaign = ref<Campaign | null>(null);
  
      const loadCampaign = async () => {
        const data = await getCampaignById(Number(route.params.id));
        if (data) campaign.value = data;
      };
  
      const goBack = () => router.push("/");
  
      onMounted(loadCampaign);
  
      return { campaign, goBack };
    }
  });
  </script>
  
  <style scoped>
/* Estilos gerais */
div {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho da seção */
h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 2px solid #ff5a5f;
  padding-bottom: 5px;
}

h3 {
  color: #555;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

/* Estilos do parágrafo */
p {
  font-size: 16px;
  color: #444;
  line-height: 1.5;
  margin: 8px 0;
}

/* Lista de voluntários */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 16px;
  color: #666;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 0;
  background-color: #fff;
}

/* Botão de voltar */
button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #ff5a5f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff7577;
}

button:focus {
  outline: none;
}

/* Estilos do Header */
header {
  background-color: #ff5a5f;
  color: #fff;
  padding: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>
