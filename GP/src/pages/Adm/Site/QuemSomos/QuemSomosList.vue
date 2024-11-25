<template>
  <div class="container">
    <h1>Gerenciar "Quem Somos"</h1>
    <div class="add-voltar">
      <button class="btn-add" @click="openCreateModal()">Adicionar</button>
      <button class="btn-back" @click="voltar()">Voltar Para a Administração</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Texto</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ entry.text }}</td>
          <td><img :src="entry.image" alt="Imagem" width="150" /></td>
          <td class="acoes">
            <button class="btn-editar" @click="openEditModal(entry)">Editar</button>
            <button class="btn-excluir" @click="deleteEntry(entry.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para criação/edição -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar' : 'Adicionar' }} Entrada</h2>
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="text">Texto:</label>
            <input
              v-model="formData.text"
              type="text"
              id="text"
              placeholder="Texto para quem somos"
              required
            />
          </div>
          <div>
            <label for="image">Imagem:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              @change="handleFileUpload"
            />
          </div>
          <div class="modal-buttons">
            <button type="submit">{{ isEditing ? 'Salvar' : 'Criar' }}</button>
            <button type="button" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import env from '../../../../../env'; // Certifique-se de configurar corretamente o ambiente
import { useRouter } from 'vue-router';
interface AboutUsEntry {
  id: string;
  text: string;
  image: string;
}

export default defineComponent({
  setup() {
    const entries = ref<AboutUsEntry[]>([]);
    const showModal = ref(false);
    const isEditing = ref(false);
    const formData = reactive({
      id: '',
      text: '',
      image: null as File | null,
    });
    const router = useRouter();
    // Carregar entradas da API
    const loadEntries = async () => {
      try {
        const response = await axios.get(`${env.url.local}/about`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        entries.value = response.data.data.map((entry: any) => ({
          id: entry.id,
          text: entry.text,
          image: entry.image,
        }));
      } catch (error) {
        console.error('Erro ao carregar entradas:', error);
      }
    };

    // Manipular upload de imagem
    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        formData.image = target.files[0];
      }
    };

    // Abrir modal para adicionar
    const openCreateModal = () => {
      isEditing.value = false;
      formData.id = '';
      formData.text = '';
      formData.image = null;
      showModal.value = true;
    };

    // Abrir modal para editar
    const openEditModal = (entry: AboutUsEntry) => {
      isEditing.value = true;
      formData.id = entry.id;
      formData.text = entry.text;
      formData.image = null;  // Caso queira permitir que a imagem seja reeditada, remova esta linha.
      showModal.value = true;
    };

    // Enviar formulário (criar ou editar)
    const handleSubmit = async () => {
      try {
        const data = new FormData();
        data.append('text', formData.text);
        if (formData.image) {
          data.append('image', formData.image);
        }

        if (isEditing.value) {
          // Atualizar (editar)
          await axios.put(`${env.url.local}/about/${formData.id}`, data, {
            headers: { "ngrok-skip-browser-warning": "true" },
          });
        } else {
          // Criar nova entrada
          await axios.post(`${env.url.local}/about`, data, {
            headers: { "ngrok-skip-browser-warning": "true" },
          });
        }

        closeModal();
        loadEntries();
      } catch (error) {
        console.error('Erro ao salvar entrada:', error);
      }
    };

    // Excluir entrada
    const deleteEntry = async (id: string) => {
      if (!confirm('Tem certeza que deseja excluir esta entrada?')) return;
      try {
        await axios.delete(`${env.url.local}/about/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        loadEntries();
      } catch (error) {
        console.error('Erro ao excluir entrada:', error);
      }
    };

    const voltar = () => {
      router.push('/admin')
    }

    // Fechar modal
    const closeModal = () => {
      showModal.value = false;
    };

    // Carregar entradas ao montar o componente
    onMounted(() => {
      loadEntries();
    });

    return {
      entries,
      showModal,
      isEditing,
      formData,
      voltar,
      openCreateModal,
      openEditModal,
      handleFileUpload,
      handleSubmit,
      deleteEntry,
      closeModal,
    };
  },
});
</script>
<style scoped>
/* Importando fonte */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

/* Tipografia geral */
a,
h1,
p,
h2,
h3,
label,
span,
td, th {
  font-family: "Poppins", serif;
}

/* Estilo do contêiner principal */
.container {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #4a90e2;
  margin-bottom: 20px;
  text-align: center;
}

/* Botões "Adicionar" e "Voltar" */
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

.btn-add {
  background-color: #28a745;
}
img{
  width: 100px;
}
.btn-add:hover {
  background-color: #218838;
}

.btn-back {
  background-color: #0396f8;
}

.btn-back:hover {
  background-color: #0095c2;
}

/* Estilo da tabela */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #4a90e2;
  color: #fff;
  font-weight: bold;
}
.table td{
  height: 10.5dvh;
}
.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #e9e9e9;
}

/* Seção de ações */
.acoes {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* Botões de ação */
button {
  padding: 6px 12px;
  font-size: 14px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 3px;
}

.btn-detalhes {
  background-color: #007bff;
}

.btn-detalhes:hover {
  background-color: #0056b3;
}

.btn-editar {
  background-color: #ff7300;
}

.btn-editar:hover {
  background-color: #ff6600;
}

.btn-excluir {
  background-color: #dc3545;
}

.btn-excluir:hover {
  background-color: #c82333;
}

/* Barra de pesquisa */
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

/* Estilo adicional para formulários */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

form textarea,
form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

form textarea:focus,
form input:focus {
  border-color: #4a90e2;
}

form button {
  width: fit-content;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #3b7ac8;
}
</style>