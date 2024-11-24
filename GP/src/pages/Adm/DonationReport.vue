<template>
  <div class="container">
    <h1>Relatório de Doações</h1>
    <div class="add-voltar">
      <button @click="backAdmin" class="btn-back">Voltar Para a Administração</button>
    </div>

    <div class="filters">
      <input type="text" v-model="searchQuery" @input="filteredDonations" placeholder="Pesquisar Doações Específicas..." class="search-bar" />
      <select v-model="selectedMonth" class="month-select">
        <option value="">Todos os Meses</option>
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.name }}
        </option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Nome do Doador</th>
          <th>Data da Doação</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody v-if="filteredDonations.length">
        <tr v-for="donation in filteredDonations" :key="donation.id">
          <td>{{ donation.nameDonor }}</td>
          <td>{{ new Date(donation.date).toLocaleDateString() }}</td>
          <td>R$ {{ donation.donation.toFixed(2) }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3" style="text-align: center;">Nenhuma doação encontrada.</td>
        </tr>
      </tbody>

    </table>

    <div class="total">
      <h3>Total Arrecadado: R$ {{ totalAmount.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import env from "../../../env"; // Ajuste o caminho para seu arquivo de configuração

// Interface de tipagem para doações
interface Donation {
  id: string;
  nameDonor: string;
  date: string; // Formato: "YYYY-MM-DD"
  donation: number;
}

export default defineComponent({
  name: "DonationReport",
  setup() {
    // Reactive variables
    const donations = ref<Donation[]>([]); // Dados das doações
    const searchQuery = ref<string>(""); // Pesquisa por nome do doador
    const selectedMonth = ref<string>(""); // Filtro por mês
    const isLoading = ref(false); // Estado de carregamento

    // Meses disponíveis
    const months = ref([
      { value: "01", name: "Janeiro" },
      { value: "02", name: "Fevereiro" },
      { value: "03", name: "Março" },
      { value: "04", name: "Abril" },
      { value: "05", name: "Maio" },
      { value: "06", name: "Junho" },
      { value: "07", name: "Julho" },
      { value: "08", name: "Agosto" },
      { value: "09", name: "Setembro" },
      { value: "10", name: "Outubro" },
      { value: "11", name: "Novembro" },
      { value: "12", name: "Dezembro" },
    ]);

    // Computed properties
    const filteredDonations = computed(() => {
      return donations.value.filter((donation) => {
        const matchesName = donation.nameDonor
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesMonth = selectedMonth.value
          ? donation.date.slice(5, 7) === selectedMonth.value
          : true;
        return matchesName && matchesMonth;
      });
    });

    const totalAmount = computed(() => {
      return filteredDonations.value.reduce(
        (total, donation) => total + donation.donation,
        0
      );
    });

    // Methods
    const loadDonations = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(env.url.local + '/donations', {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        donations.value = data.data || [];
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
        donations.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    const router = useRouter();

    const backAdmin = () => {
      router.push("/admin");
    };

    // Lifecycle hook
    loadDonations();

    return {
      donations,
      searchQuery,
      selectedMonth,
      months,
      filteredDonations,
      totalAmount,
      loadDonations,
      backAdmin,
      isLoading,
    };
  },
});
</script>

<style scoped>
/* Estilo similar ao seu código atual */
.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.add-voltar button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #0396f8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-voltar button:hover {
  background-color: #0095c2;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #4a90e2;
  color: #fff;
  font-weight: bold;
}

.total {
  text-align: center;
  margin-top: 20px;
}

.search-bar {
  width: 97.5%;
  padding: 8px 12px;
  margin: 15px 0;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.month-select {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
