<template>
  <div class="container">
    <h1>Lista de Campanhas</h1>
    <button @click="backAdmin" class="btn-back">Voltar Para a Administração</button>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Início</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.id">
          <td>{{ campaign.title }}</td>
          <td>{{ formatDate(campaign.startDate) }}</td>
          <td>{{ (campaign.address) }}</td>
          <td class="acoes">
            <button class="btn-detalhes" @click="viewDetails(campaign.id)">Ver Detalhes</button>
            <button class="btn-editar" @click="editCampaign(campaign.id)">Editar</button>
            <button class="btn-excluir" @click="deleteCampaign(campaign.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import env from '../../../env'; // Certifique-se de configurar corretamente seu ambiente
import { useRouter } from 'vue-router';

interface Campaign {
  id: string;
  title: string;
  startDate: number; // Data em timestamp
  endDate: number; // Data em timestamp
  address:string;
}

export default defineComponent({
  setup() {
    const campaigns = ref<Campaign[]>([]);
    const router = useRouter();

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

    const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const viewDetails = (id: string) => {
      router.push(`/campaigns/${id}`);
    };

    const editCampaign = (id: string) => {
      router.push(`/campaigns/form/${id}`);
    };

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

    const backAdmin = () => router.push('/admin');

    onMounted(() => {
      loadCampaigns();
    });

    return {
      campaigns,
      editCampaign, 
      viewDetails,
      deleteCampaign,
      formatDate,
      backAdmin,
    };
  },
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

.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
h1 {
  font-size: 24px;
  color: #4a90e2;
  margin-bottom: 20px;
  text-align: center;
}

.add-voltar{
  width: 100%;
  display: flex;
  /* align-items: end; */
  text-align: right;
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

.btn-add {
  background-color: #28a745;
}
.btn-add:hover {
  background-color: #218838;
}

.btn-back {
  background-color: #0396f8;
}
.btn-back:hover {
  background-color: #0095c2;
}

/* Tabela */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}
.table td{
  height: 7dvh;
}

.table th {
  background-color: #4a90e2;
  color: #fff;
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #e9e9e9;
}

.acoes{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* Botões de ação */
button {
  padding: 6px 12px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 3px;
}

.btn-detalhes {
  background-color: #007bff;
}

.btn-detalhes:hover {
  background-color: #0056b3;
}

.btn-editar {
  background-color: #ff7300;
}

.btn-editar:hover {
  background-color: #ff6600;
}

.btn-excluir {
  background-color: #dc3545;
}

.btn-excluir:hover {
  background-color: #c82333;
}

.search-bar {
  width: 97.5%;
  padding: 8px 12px;
  margin: 15px 0;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s;
}

.search-bar:focus {
  border-color: #4a90e2;
}
</style>
