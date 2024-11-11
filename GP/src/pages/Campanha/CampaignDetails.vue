<template>
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
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const campaign = ref<Campaign | null>(null);
  
      const loadCampaign = async () => {
        const data = await getCampaignById(Number(route.params.id));
        if (data) campaign.value = data;
      };
  
      const goBack = () => router.push("/admin/campaigns");
  
      onMounted(loadCampaign);
  
      return { campaign, goBack };
    }
  });
  </script>
  