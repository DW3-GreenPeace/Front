<template>
    <div>
      <h2>{{ isEdit ? "Editar" : "Adicionar" }} Campanha</h2>
      <form @submit.prevent="submitForm">
        <label>Título:</label>
        <input v-model="campaign.title" required />
  
        <label>Descrição:</label>
        <textarea v-model="campaign.description" required></textarea>
  
        <label>Data de Início:</label>
        <input v-model="campaign.startDate" type="date" required />
  
        <label>Data de Término:</label>
        <input v-model="campaign.endDate" type="date" required />
  
        <button type="submit">{{ isEdit ? "Salvar" : "Adicionar" }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Campaign } from '../../types/campaign';
  import { createCampaign, updateCampaign, getCampaignById } from '../../services/campaignService';
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const isEdit = ref(route.params.id !== "new");
      const campaign = ref<Campaign>({ id: 0, title: "", description: "", startDate: "", endDate: "", volunteers: [] });
  
      const loadCampaign = async () => {
        if (isEdit.value) {
          const data = await getCampaignById(Number(route.params.id));
          if (data) campaign.value = data;
        }
      };
  
      const submitForm = async () => {
        if (isEdit.value) {
          await updateCampaign(campaign.value.id, campaign.value);
        } else {
          await createCampaign(campaign.value);
        }
        router.push("/admin/campaigns");
      };
  
      onMounted(loadCampaign);
  
      return { campaign, isEdit, submitForm };
    }
  });
  </script>
  