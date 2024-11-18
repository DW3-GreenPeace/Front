<template>
    <div class="container">
      <div class="top">
      <h2>{{ isEdit ? "Editar" : "Criar" }} Campanha</h2>
      
        <button @click="backAdmin" class="btn-back">Voltar Para a Admistração</button>
      
    </div>
      <form @submit.prevent="submitForm">
        <label>Título:</label>
        <input type="text" v-model="campaign.title" required />
  
        <label>Descrição:</label>
        <textarea v-model="campaign.description" required></textarea>
  
        <label>Data de Início:</label>
        <input v-model="campaign.startDate" type="date" required />
  
        <label>Data de Término:</label>
        <input v-model="campaign.endDate" type="date" required />
  
        <button type="submit">{{ isEdit ? "Salvar" : "Criar" }}</button>
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
        router.push("/admin/campanha/list");
      };

      const backAdmin = () => {
      router.push("/admin");
    };
      onMounted(loadCampaign);
  
      return { campaign, isEdit, submitForm, backAdmin };
    }
  });
  </script>
  
  <style scoped>
.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
}

h2{
  text-align: center;
  font-family: "Poppins", serif;
}


.top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}

.btn-back {
  background-color: #0396f8;
}
.btn-back:hover {
  background-color: #0095c2;
}

  form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-top: 15px;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  width: 96%;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
  border-color: #4a90e2;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

button:hover {
  background-color: #357ab8;
}

@media (max-width: 500px) {
  form {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>