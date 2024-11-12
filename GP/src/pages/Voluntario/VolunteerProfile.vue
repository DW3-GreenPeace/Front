<template>
    <div class="profile">
      <h2>Perfil do Voluntário</h2>
  
      <div class="volunteer-info">
        <p><strong>Nome:</strong> {{ volunteer.name }}</p>
        <p><strong>Email:</strong> {{ volunteer.email }}</p>
      </div>
  
      <h3>Campanhas Inscritas</h3>
  
      <div v-if="campaigns.length > 0">
        <ul class="campaign-list">
          <li v-for="campaign in campaigns" :key="campaign.id">
            <h4>{{ campaign.title }}</h4>
            <p>{{ campaign.description }}</p>
            <p><strong>Data de Início:</strong> {{ campaign.startDate }}</p>
            <p><strong>Data de Término:</strong> {{ campaign.endDate }}</p>
          </li>
        </ul>
      </div>
  
      <p v-else class="no-campaign-message">Você ainda não se inscreveu em nenhuma campanha.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getVolunteerCampaigns } from '../../services/volunteerService';
  
  export default defineComponent({
    setup() {
      const volunteer = ref({ name: '', email: '' });
      const campaigns = ref([]);
  
      const loadVolunteerData = async () => {
        // Carregar dados do voluntário
        const volunteerData = await getVolunteerInfo();
        if (volunteerData) volunteer.value = volunteerData;
  
        // Carregar campanhas em que o voluntário está inscrito
        const volunteerCampaigns = await getVolunteerCampaigns();
        if (volunteerCampaigns) campaigns.value = volunteerCampaigns;
      };
  
      onMounted(loadVolunteerData);
  
      return { volunteer, campaigns };
    },
  });
  </script>
  
  <style scoped>
  .profile {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .volunteer-info {
    margin-bottom: 20px;
    color: #333;
  }
  
  h2 {
    color: #333;
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 22px;
    color: #555;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  
  .campaign-list {
    list-style-type: none;
    padding: 0;
  }
  
  .campaign-list li {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .campaign-list h4 {
    font-size: 18px;
    color: #ff5a5f;
    margin: 0 0 5px 0;
  }
  
  .campaign-list p {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
  }
  
  .no-campaign-message {
    color: #888;
    font-size: 16px;
    margin-top: 20px;
  }
  </style>
  