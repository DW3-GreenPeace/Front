<template>
    <div>
      <h1>Lista de Campanhas</h1>
      <button @click="addCampaign">Adicionar Campanha</button>
      <ul>
        <li v-for="campaign in campaigns" :key="campaign.id">
          <span>{{ campaign.title }} - {{ campaign.startDate }} a {{ campaign.endDate }}</span>
          <button @click="viewDetails(campaign.id)">Ver Detalhes</button>
          <button @click="editCampaign(campaign.id)">Editar</button>
          <button @click="deleteCampaign(campaign.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Campaign } from '../../types/campaign';
  import { getCampaigns, deleteCampaign } from '../../services/campaignService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const campaigns = ref<Campaign[]>([]);
      const router = useRouter();
  
      const loadCampaigns = async () => {
        campaigns.value = await getCampaigns();
      };
  
      const viewDetails = (id: number) => router.push(`/admin/campaign/${id}`);
      const addCampaign = () => router.push(`/admin/campaign/new`);
      const editCampaign = (id: number) => router.push(`/admin/campaign/edit/${id}`);
  
      const deleteCampaignById = async (id: number) => {
        await deleteCampaign(id);
        loadCampaigns();
      };
  
      onMounted(loadCampaigns);
  
      return { campaigns, viewDetails, addCampaign, editCampaign, deleteCampaign: deleteCampaignById };
    }
  });
  </script>
  