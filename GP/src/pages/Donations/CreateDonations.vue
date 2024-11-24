<template>
  <section class="donation-form-section">
    <form @submit="handleSubmit" class="donation-form">
      <h2>Fazer Doação</h2>

      <div class="form-group">
        <label for="nameDonor">Nome do Doador:</label>
        <input type="text" id="nameDonor" v-model="nameDonor" placeholder="Nome completo" />
      </div>

      <div class="form-group">
        <label for="date">Data da Doação:</label>
        <input type="date" id="date" v-model="date" />
      </div>

      <div class="form-group">
        <label for="donation">Valor da Doação (R$):</label>
        <input type="number" id="donation" v-model="donation" placeholder="100" />
      </div>

      <div v-if="mensagem" class="mensagem">{{ mensagem }}</div>

      <button type="submit" :disabled="carregando" class="submit-button">
        {{ carregando ? "Enviando..." : "Cadastrar Doação" }}
      </button>

      <button type="button" class="back-button" @click="goBack">
        Voltar ao Início
      </button>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import env from "../../../env"; // Substitua pelo caminho correto do seu arquivo de configuração de ambiente.
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const nameDonor = ref("");
    const date = ref("");
    const donation = ref < number | null > (null);
    const mensagem = ref("");
    const carregando = ref(false);
    const router = useRouter();

    // Define a data atual no formato YYYY-MM-DD
    const setCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
      const day = String(today.getDate()).padStart(2, "0");
      date.value = `${year}-${month}-${day}`;
    };

    // Define a data automaticamente quando o componente é montado
    onMounted(() => {
      setCurrentDate();
    });

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!nameDonor.value || !date.value || !donation.value) {
        mensagem.value = "Por favor, preencha todos os campos.";
        return;
      }

      const dadosDoacao = {
        nameDonor: nameDonor.value,
        date: date.value,
        donation: donation.value,
      };

      carregando.value = true;

      try {
        const resposta = await axios.post(env.url.local + "/donations", dadosDoacao, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (resposta.status === 200) {
          Swal.fire({
            title: "Sucesso!",
            text: "Obrigado pela doação!!!",
            icon: "success",
            confirmButtonText: "Foi um prazer!",
          });
          nameDonor.value = "";
          setCurrentDate(); // Redefine a data para o dia atual
          donation.value = null;
        } else {
          mensagem.value = "Erro ao cadastrar doação.";
        }
      } catch (error: any) {
        mensagem.value = `Erro: ${error.response?.data?.message || "Erro de conexão"}`;
        console.error(error);
      } finally {
        carregando.value = false;
      }
    };

    const goBack = () => {
      router.push("/");
    };

    return {
      nameDonor,
      date,
      donation,
      mensagem,
      carregando,
      handleSubmit,
      goBack,
    };
  },
});
</script>

<style scoped>
.donation-form-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #85d8ce, #085078);
  color: #fff;
}

.donation-form {
  background: #ffffff;
  color: #333;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.donation-form h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.8rem;
  color: #085078;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #085078;
}

input {
  width: 94%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #085078;
}

.mensagem {
  color: #d9534f;
  font-weight: bold;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button {
  background-color: #085078;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #063947;
}

.back-button {
  background-color: #ccc;
  color: #333;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #bbb;
}
</style>
