<template>
  <div class="container">
    <h1>Lista de Campanhas</h1>
    <div class="add-voltar">
      <button @click="addCampaign" class="btn-add">Adicionar Campanha</button>
      <button @click="backAdmin" class="btn-back">Voltar Para a Admistração</button>
    </div>
    
    
    <input 
      type="text" 
      v-model="searchQuery" 
      @input="filterCampaigns" 
      placeholder="Pesquisar Campanhas..." 
      class="search-bar"
    />
    
    <table class="table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Período</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in filteredCampaigns" :key="campaign.id">
          <td>{{ campaign.title }}</td>
          <td>{{ campaign.startDate }} a {{ campaign.endDate }}</td>
          <td class="acoes">
            <button @click="editCampaign(campaign.id)" class="btn-editar">Editar</button>
            <button @click="viewDetails(campaign.id)" class="btn-detalhes">Ver Detalhes</button>
            <button @click="deleteCampaign(campaign.id)" class="btn-excluir">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Campaign } from '../../types/campaign';
import { getCampaigns, deleteCampaign } from '../../services/campaignService';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const campaigns = ref<Campaign[]>([]);
    const searchQuery = ref("");
    const router = useRouter();

    const loadCampaigns = async () => {
      campaigns.value = await getCampaigns();
    };

    const filteredCampaigns = computed(() => {
      return campaigns.value.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const viewDetails = (id: number) => router.push(`/campanha/details/${id}`);
    const addCampaign = () => router.push(`/admin/campanha/form`);
    const backAdmin = () => router.push(`/admin`);
    const editCampaign = (id: number) => router.push(`/admin/campaign/edit/${id}`);

    const deleteCampaignById = async (id: number) => {
      await deleteCampaign(id);
      loadCampaigns();
    };

    onMounted(loadCampaigns);

    return { campaigns, searchQuery, filteredCampaigns, viewDetails, addCampaign, backAdmin, editCampaign, deleteCampaign: deleteCampaignById };
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
.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
}

h1 {
  font-size: 24px;
  color: #4a90e2;
  margin-bottom: 20px;
  text-align: center;
}

.add-voltar{
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