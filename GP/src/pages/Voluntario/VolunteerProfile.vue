<template>
  <div class="profile">
    <h2>Perfil do Voluntário</h2>
    <div class="actions">
      <router-link to="/login">
        <button class="btn">Sair</button>
      </router-link>
      <router-link to="/voluntario/form">
        <button class="btn">Editar</button>
      </router-link>
      <button class="btn delete" @click="deleteAccount">Excluir conta</button>
    </div>

    <div class="volunteer-info">
      <p><strong>Nome:</strong> {{ volunteer.name }}</p>
      <p><strong>Email:</strong> {{ volunteer.email }}</p>
    </div>

    <h3>Campanhas Inscritas</h3>

    <div v-if="campaigns.length > 0" class="campaign-list">
      <ul>
        <li v-for="campaign in campaigns" :key="campaign.id" class="campaign-item">
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
// No componente de perfil do voluntário
import { defineComponent, ref, onMounted } from 'vue';
import { getVolunteerCampaigns, getVolunteerById, deleteVolunteer } from '../../services/volunteerService';
import { getUserId } from '../../services/authService';

export default defineComponent({
  setup() {
    const volunteer = ref(null);
    const campaigns = ref([]);

    const loadVolunteerData = async () => {
      const userId = getUserId();
      if (userId) {
        const volunteerData = await getVolunteerById(Number(userId));
        if (volunteerData) volunteer.value = volunteerData;

        const volunteerCampaigns = await getVolunteerCampaigns(Number(userId));
        if (volunteerCampaigns) campaigns.value = volunteerCampaigns;
      }
    };

    const deleteAccount = async () => {
      if (confirm('Tem certeza de que deseja excluir sua conta?')) {
        const userId = getUserId();
        if (userId) {
          await deleteVolunteer(Number(userId));
          alert('Conta excluída com sucesso.');
          // Redirecionar ou deslogar após a exclusão da conta
        }
      }
    };

    onMounted(loadVolunteerData);

    return { volunteer, campaigns, deleteAccount };
  },
});
</script>

<style scoped>
.profile {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.btn {
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

.btn:hover {
  background-color: #357ab8;
}

.delete {
  background-color: #e74c3c;
}

.delete:hover {
  background-color: #c0392b;
}

.volunteer-info {
  color: #333;
  margin-bottom: 20px;
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
  padding: 0;
}

.campaign-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.campaign-item h4 {
  font-size: 18px;
  color: #ff5a5f;
  margin: 0 0 5px 0;
}

.campaign-item p {
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
