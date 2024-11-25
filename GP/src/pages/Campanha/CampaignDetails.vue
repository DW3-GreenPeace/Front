<template>
  <div class="container">
    <h1>Detalhes da Campanha: {{ campaign.title }}</h1>
    <button @click="backToCampaigns" class="btn-back">Voltar Para a Lista de Campanhas</button>

    <div class="campaign-info">
      <p><strong>Descrição:</strong> {{ campaign.description }}</p>
      <p><strong>Endereço:</strong> {{ campaign.address }}</p>
      <p><strong>Data de Início:</strong> {{ formatDate(campaign.startDate) }}</p>
      <p><strong>Data de Término:</strong> {{ formatDate(campaign.endDate) }}</p>
    </div>

    <h2>Voluntários Associados</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Data de Cadastro</th>
        </tr>
      </thead>
      <tbody>
        <!-- Se não houver voluntários, a tabela não será exibida -->
        <tr v-if="volunteers.length === 0">
          <td colspan="3">Nenhum voluntário associado a esta campanha.</td>
        </tr>
        <tr v-for="volunteer in volunteers" :key="volunteer.id">
          <td>{{ volunteer.name }}</td>
          <td>{{ volunteer.email }}</td>
          <td>{{ formatDate(volunteer.registrationDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import env from '../../../env';

interface Campaign {
  id: string;
  title: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  volunteers: Volunteer[];
}

interface Volunteer {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
}

export default defineComponent({
  setup() {
    const campaign = ref<Campaign>({} as Campaign);
    const volunteers = ref<Volunteer[]>([]);
    const route = useRoute();
    const router = useRouter();

    // Função para carregar os detalhes da campanha e os voluntários
    const loadCampaignDetails = async () => {
      const campaignId = route.params.id as string;
      try {
        // Exemplo de dados simulados com base na sua estrutura
        const response = {
          data: {
            title: "aaaaaaaaaaaaaaaaaaaaaa",
            description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            address: "aaaaaaaaaaaaaaaaaaaaaaa",
            startDate: "2024-11-26",
            endDate: "2024-11-30",
            volunteers: [] // Nenhum voluntário neste caso
          }
        };

        // Atribuindo os dados simulados à variável campaign
        campaign.value = response.data;

        // Caso queira obter voluntários da API, descomente a linha abaixo:
        // const volunteersResponse = await axios.get(`${env.url.local}/campaigns/${campaignId}/volunteers`);
        // volunteers.value = volunteersResponse.data.data;

      } catch (error) {
        console.error('Erro ao buscar detalhes da campanha:', error);
      }
    };

    // Função para formatar as datas
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Função para voltar para a lista de campanhas
    const backToCampaigns = () => {
      router.push('/campaigns');
    };

    onMounted(() => {
      loadCampaignDetails();
    });

    return {
      campaign,
      volunteers,
      formatDate,
      backToCampaigns,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

h1, h2 {
  color: #4a90e2;
}

button {
  padding: 8px 16px;
  background-color: #0396f8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #007bb5;
}

.campaign-info {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #4a90e2;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #f1f1f1;
}
</style>
