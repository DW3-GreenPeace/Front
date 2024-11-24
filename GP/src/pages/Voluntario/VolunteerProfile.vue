<template>
  <div class="profile-container">
    <div class="profile">
      <div class="user">
        <div class="foto"></div>
        <h1>Bem-vindo, {{ usuario?.name }}</h1>
        <p> {{ usuario?.email }}</p>
      </div>
      <div class="buttons">
        <button @click="createCampaign">Criar Campanha</button>
        <button @click="toggleEdit">Editar Perfil</button>
      <button @click="logout">Sair</button>
      </div>
    </div>
      <div class="campaigns">
        <h2>Suas Campanhas</h2>
        <ul v-if="campaigns.length > 0">
          <li v-for="(campaign, index) in campaigns" :key="index">
            {{ campaign.name }} - {{ campaign.description }}
          </li>
        </ul>
        <p v-else>Você ainda não está inscrito em nenhuma campanha.</p>
      </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Profile",
  setup() {
    const router = useRouter();
    const usuario = ref({
      name: "",
      email: "",
      secretaria: false,
    });
    const editing = ref(false);
    const campaigns = ref([]); // Lista de campanhas do usuário
    const editData = ref({ name: "", email: "" });

    // Carrega os dados do usuário ao montar o componente
    onMounted(() => {
      const userData = localStorage.getItem("usuario");
      if (userData) {
        try {
          usuario.value = JSON.parse(userData);
          editData.value = { ...usuario.value }; // Preenche os dados de edição
          loadCampaigns(); // Carrega as campanhas do usuário
        } catch (error) {
          console.error("Erro ao analisar os dados do usuário:", error);
          localStorage.removeItem("usuario");
          alert("Erro nos dados do usuário. Redirecionando para o login.");
          router.push("/");
        }
      } else {
        alert("Usuário não autenticado. Redirecionando para o login.");
        router.push("/");
      }
    });

    // Função para alternar modo de edição
    const toggleEdit = () => {
      router.push('/volunteers/form')
    };

    // Função para salvar alterações do perfil
    const saveEdit = () => {
      usuario.value = { ...editData.value };
      localStorage.setItem("usuario", JSON.stringify(usuario.value));
      alert("Perfil atualizado com sucesso!");
      toggleEdit();
    };

    // Função para criar uma nova campanha
    const createCampaign = () => {
      const newCampaign = {
        name: "Nova Campanha",
        description: "Descrição da campanha",
      };
      campaigns.value.push(newCampaign);
      alert("Campanha criada com sucesso!");
    };

    // Função para carregar campanhas do usuário
    const loadCampaigns = () => {
      // Simulando campanhas do usuário
     
    };

    // Função de logout
    const logout = () => {
      localStorage.removeItem("usuario");
      alert("Você foi desconectado.");
      router.push("/");
    };

    return {
      usuario,
      campaigns,
      editing,
      editData,
      toggleEdit,
      saveEdit,
      createCampaign,
      logout,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.profile-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow-x: hidden;
}

.profile {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.buttons{
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.edit-form {
  margin-top: 20px;
  text-align: left;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

h2 {
  font-size: 1.2rem;
  margin: 20px 0 10px;
  color: #555;
}

p {
  font-size: 1rem;
  margin: 10px 0;
  color: #666;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

input {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.campaigns ul {
  list-style: none;
  padding: 0;
}

.campaigns li {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 0;
}
</style>
