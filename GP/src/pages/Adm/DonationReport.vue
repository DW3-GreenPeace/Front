<template>
    <div>
      <h1>Relatório de Doações</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do Donor</th>
            <th>Valor</th>
            <th>Data da Doação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="donation in donations" :key="donation.id">
            <td>{{ donation.donorName }}</td>
            <td>{{ donation.amount | currency }}</td>
            <td>{{ donation.date }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="total">
        <h3>Total Arrecadado: {{ totalAmount | currency }}</h3>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from "vue";
  
  interface Donation {
    id: number;
    donorName: string;
    amount: number;
    date: string;
  }
  
  export default defineComponent({
    name: "DonationReport",
    data() {
      return {
        donations: [
          { id: 1, donorName: "João Silva", amount: 100, date: "2024-11-01" },
          { id: 2, donorName: "Maria Oliveira", amount: 50, date: "2024-11-05" },
          { id: 3, donorName: "Carlos Souza", amount: 200, date: "2024-11-10" },
          // Adicione mais doações conforme necessário
        ] as Donation[],
      };
    },
    computed: {
      totalAmount(): number {
        return this.donations.reduce((total, donation) => total + donation.amount, 0);
      },
    },
  });
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .total {
    text-align: center;
    margin-top: 20px;
  }
  
  .currency {
    color: green;
    font-weight: bold;
  }
  </style>
    