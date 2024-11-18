<template>
    <Header />
    <div class="container">
      <div class="title">
        <h1>Campanha Disponiveis</h1>
        <p>Caso não apareca nenhum botão para participar da campanha, se cadastre como volutário
          <router-link to="/register">
              Clique aqui
          </router-link>
          ou entra com sua conta
        </p>
      </div>
      
      
    <div class="campaign-list">
      <div v-for="campaign in campaigns" :key="campaign.id" class="campaign-card">
        <h2>{{ campaign.title }}</h2>
        <p><strong>Descrição:</strong> {{ campaign.description }}</p>
        <p><strong>Endereço:</strong> {{ campaign.address }}</p>
        <p><strong>Data de Início:</strong> {{ campaign.startDate }}</p>
        <p><strong>Data de Término:</strong> {{ campaign.endDate }}</p>
        
        <!-- Condição para exibir o botão apenas para usuários logados e voluntários -->
        <button v-if="canJoin" @click="joinCampaign(campaign.id)">Participar da Campanha</button>
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { Campaign } from '../../types/campaign';
  import { getCampaigns, joinCampaignById } from '../../services/campaignService';
  import { isAuthenticated, isVolunteer } from '../../services/authService';
  import Header from '../../components/Header.vue';
  
  export default defineComponent({
    name: "CampaignList",

    components:{
        Header
    },

    setup() {
      const campaigns = ref<Campaign[]>([]);
      const userId = ref<number | null>(null); // Armazena o ID do usuário logado
  
      // Função para carregar campanhas
      const loadCampaigns = async () => {
        campaigns.value = await getCampaigns();
      };
  
      // Função para verificar se o usuário é voluntário e está autenticado
      const canJoin = computed(() => isAuthenticated() && isVolunteer());
  
      // Função para participar da campanha
      const joinCampaign = async (campaignId: number) => {
        if (canJoin.value && userId.value !== null) {
          await joinCampaignById(campaignId, { id: userId.value, name: "Nome do Voluntário", email: "email@exemplo.com" });
          alert("Você se inscreveu na campanha com sucesso!");
        } else {
          alert("É necessário estar logado como voluntário para se inscrever.");
        }
      };
  
      onMounted(async () => {
        await loadCampaigns();
        // Recupera o ID do usuário logado, se ele estiver autenticado
        if (isAuthenticated()) {
          userId.value = 123; // Simule o ID do usuário, ou recupere-o de um serviço de autenticação
        }
      });
  
      return { campaigns, canJoin, joinCampaign };
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
  /* Estilos gerais */
  .campaign-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .campaign-card {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
  
  .title{
    text-align: center  ;
  }
  .campaign-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Cabeçalho da campanha */
  h2 {
    color: #333;
    font-size: 22px;
    margin-bottom: 10px;
    border-bottom: 2px solid #4a90e2;
    padding-bottom: 5px;
  }
  
  p {
    font-size: 16px;
    color: #444;
    margin: 8px 0;
  }
  
  /* Botão de participar */
  button {
    margin-top: 15px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #4a90e2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #357ab8;
  }
  </style>
  