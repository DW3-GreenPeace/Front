<template>
  <div class="container">
    <h1>Relatório de Doações</h1>
    <div class="add-voltar">
      <button @click="backAdmin" class="btn-back">Voltar Para a Admistração</button>
    </div>

    <div class="filters">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="filterdDonations" 
        placeholder="Pesquisar Doações Específicas..." 
        class="search-bar" 
      />
      
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
          <th>Nome do Donor</th>
          <th>Data da Doação</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="donation in filteredDonations" :key="donation.id">
          <td>{{ donation.nameDonor }}</td>
          <td>{{ donation.date }}</td>
          <td>R$ {{ donation.donation | currency }}</td>
        </tr>
      </tbody>
    </table>

    <div class="total">
      <h3>Total Arrecadado: R${{ totalAmount | currency }}</h3>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getDonation } from "../../services/donationService";
import { Donation } from "../../types/donation";

export default defineComponent({
  name: "DonationReport",
  setup() {
    const donation = ref<Donation[]>([]);
    const searchQuery = ref("");
    const selectedMonth = ref<string>("");
    const router = useRouter();

    // Lista de meses para o filtro
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
      { value: "12", name: "Dezembro" }
    ]);

    const loadDonations = async () => {
      donation.value = await getDonation();
    };

    const filteredDonations = computed(() => {
      return donation.value.filter(donation => {
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

    const backAdmin = () => {
      router.push("/admin");
    };

    onMounted(loadDonations);

    return { 
      donation, 
      searchQuery, 
      selectedMonth, 
      filteredDonations, 
      totalAmount, 
      months, 
      backAdmin 
    };
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
td,
th {
  font-family: "Poppins", serif;
}

h1 {
  text-align: center;
}

.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
}

.add-voltar {
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

  .btn-back {
    background-color: #0396f8;
  }

  .btn-back:hover {
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

.currency {
  color: green;
  font-weight: bold;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s;
}

.month-select:focus {
  border-color: #4a90e2;
}

</style>