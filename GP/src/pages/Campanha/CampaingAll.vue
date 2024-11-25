<template>
  
  <div class="campanhas-container">
    <Header />
    <h3>Campanhas Disponíveis</h3>
    <div v-if="!isLoggedIn">
      <p>Você precisa estar logado para se cadastrar em uma campanha.</p>
    </div>
    <div v-else>
      <div v-if="campaigns.length === 0">
        <p>Não há campanhas disponíveis no momento.</p>
      </div>
      <div v-for="campaign in campaigns" :key="campaign.id" class="campanha-card">
        <h4>{{ campaign.title }}</h4>
        <p>{{ campaign.address }}</p>
        <p>Início: {{ formatDate(campaign.startDate) }} | Fim: {{ formatDate(campaign.endDate) }}</p>
        <button @click="registerForCampaign(campaign.id)" class="btn-register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import env from '../../../env'; // Certifique-se de configurar corretamente seu ambiente
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';

interface Campaign {
  id: string;
  title: string;
  startDate: number; // Data em timestamp
  endDate: number; // Data em timestamp
  address: string;
}

export default defineComponent({
  components:{
    Header,
  },
  setup() {
    const campaigns = ref<Campaign[]>([]);
    const isLoggedIn = ref(false);
    const userName = ref('');
    const router = useRouter();

    // Verifica se o usuário está logado e obtém o nome do usuário
    onMounted(() => {
      const userId = localStorage.getItem('usuario');
      if (userId) {
        isLoggedIn.value = true;
        userName.value = localStorage.getItem('user_name') || '';  // Recupera o nome do usuário
        loadCampaigns();
      }
    });

    // Função para carregar as campanhas
    const loadCampaigns = async () => {
      try {
        const response = await axios.get(`${env.url.local}/campaigns`, {
          headers: { "ngrok-skip-browser-warning": "true" },
          mode: "cors",
        });
        campaigns.value = response.data.data; // Ajuste conforme a estrutura do seu JSON
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };

    // Função para formatar a data no formato desejado
    const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Função para registrar o usuário na campanha
    const registerForCampaign = async (campaignId: string) => {
      if (!userName.value) {
        console.error('Usuário não encontrado.');
        return;
      }

      try {
        const response = await axios.post(`${env.url.local}/register-campaign`, {
          userName: userName.value,
          campaignId: campaignId,
        });

        if (response.data.success) {
          alert('Cadastro realizado com sucesso!');
        } else {
          alert('Erro ao se cadastrar na campanha.');
        }
      } catch (error) {
        console.error('Erro ao se cadastrar na campanha:', error);
        alert('Erro ao se cadastrar na campanha.');
      }
    };

    // Função para visualizar detalhes da campanha
    const viewDetails = (id: string) => {
      router.push(`/campaigns/${id}`);
    };

    // Função para editar a campanha
    const editCampaign = (id: string) => {
      router.push(`/campaigns/form/${id}`);
    };

    // Função para excluir a campanha
    const deleteCampaign = async (id: string) => {
      const confirmDelete = confirm('Tem certeza que deseja excluir esta campanha?');
      if (confirmDelete) {
        try {
          await axios.delete(`${env.url.local}/campaigns/${id}`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          });
          // Remove a campanha da lista local sem recarregar a página
          campaigns.value = campaigns.value.filter(campaign => campaign.id !== id);
          alert('Campanha excluída com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir campanha:', error);
          alert('Erro ao excluir campanha.');
        }
      }
    };

    // Função para voltar à página de administração
    const backAdmin = () => router.push('/admin');

    return {
      campaigns,
      isLoggedIn,
      userName,
      editCampaign,
      viewDetails,
      deleteCampaign,
      registerForCampaign,
      formatDate,
      backAdmin,
    };
  },
});
</script>

<style scoped>
.campanhas-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

.campanha-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.campanha-card h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.campanha-card p {
  margin-bottom: 10px;
}

.btn-register {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-register:hover {
  background-color: #45a049;
}
</style>
