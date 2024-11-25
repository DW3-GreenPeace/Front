<template>
  <div class="container">
    <div class="top">
      <h2>{{ isEdit ? "Editar" : "Criar" }} Campanha</h2>
      <button @click="backAdmin" class="btn-back">Voltar para Administração</button>
    </div>
    <form @submit.prevent="submitForm">
      <label for="title">Título:</label>
      <input id="title" type="text" v-model="campaign.title" required />

      <label for="description">Descrição:</label>
      <textarea id="description" v-model="campaign.description" required></textarea>

      <label for="address">Endereço:</label>
      <input id="address" v-model="campaign.address" required />

      <label for="start-date">Data de Início:</label>
      <input id="start-date" v-model="campaign.startDate" type="date" required />

      <label for="end-date">Data de Término:</label>
      <input id="end-date" v-model="campaign.endDate" type="date" required />

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Processando..." : isEdit ? "Salvar" : "Criar" }}
      </button>
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
    const isEdit = ref(route.params.id !== "create");
    const isLoading = ref(false);
    const campaign = ref<Campaign>({
      id: 0,
      title: "",
      description: "",
      address: "",
      startDate: "",
      endDate: "",
      volunteers: [],
    });

    // Carregar dados da campanha caso seja edição
    const loadCampaign = async () => {
      if (isEdit.value) {
        try {
          const data = await getCampaignById(Number(route.params.id));
          if (data) campaign.value = data;
        } catch (error) {
          console.error("Erro ao carregar campanha:", error);
        }
      }
    };

    // Submeter formulário
    const submitForm = async () => {
      isLoading.value = true;
      try {
        if (isEdit.value) {
          await updateCampaign(campaign.value.id, campaign.value);
        } else {
          await createCampaign(campaign.value);
        }
        router.push("/admin/campanha/list");
      } catch (error) {
        console.error("Erro ao salvar campanha:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Voltar para a administração
    const backAdmin = () => {
      router.push("/admin");
    };

    onMounted(loadCampaign);

    return { campaign, isEdit, isLoading, submitForm, backAdmin };
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
}

h2 {
  text-align: center;
  font-family: "Poppins", serif;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-back {
  background-color: #0396f8;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #0095c2;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

label {
  font-size: 14px;
  font-weight: bold;
}

input,
textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #4a90e2;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #357ab8;
}

@media (max-width: 500px) {
  .top {
    flex-direction: column;
    gap: 10px;
  }

  h2 {
    font-size: 20px;
  }

  form {
    padding: 15px;
  }
}
</style>
