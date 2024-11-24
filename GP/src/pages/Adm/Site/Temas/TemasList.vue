<template>
    <div class="container">
      <h1>Gerenciar Temas</h1>
      <button class="btn-add" @click="abrirForm()">Adicionar</button>
      
      <table class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Texto</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in temas" :key="item.id">
            <td>{{ item.titulo }}</td>
            <td>{{ item.texto }}</td>
            <td><img :src="item.img" alt="Imagem" width="150" /></td>
            <td class="acoes">
              <button class="btn-editar" @click="editarItem(item)">Editar</button>
              <button class="btn-excluir" @click="excluirItem(item.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <TemasForm 
        v-if="exibirForm" 
        :itemEditar="itemEditar" 
        @fechar="fecharForm" 
        @salvar="salvarItem" 
      />
    </div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import TemasForm from './TemasForm.vue';
  
  export default defineComponent({
    components: { TemasForm },
    setup() {
      const temas = ref([
        { id: 1, titulo: 'Tema Inicial', texto: 'Texto inicial', img: 'img1.jpg' },
      ]);
      const exibirForm = ref(false);
      const itemEditar = ref(null);
  
      const abrirForm = () => {
        itemEditar.value = null;
        exibirForm.value = true;
      };
  
      const editarItem = (item: any) => {
        itemEditar.value = { ...item };
        exibirForm.value = true;
      };
  
      const excluirItem = (id: number) => {
        temas.value = temas.value.filter(item => item.id !== id);
      };
  
      const salvarItem = (item: any) => {
        if (item.id) {
          const index = temas.value.findIndex(i => i.id === item.id);
          if (index !== -1) temas.value[index] = item;
        } else {
          item.id = Date.now();
          temas.value.push(item);
        }
      };
  
      const fecharForm = () => {
        exibirForm.value = false;
      };
  
      return {
        temas,
        exibirForm,
        itemEditar,
        abrirForm,
        editarItem,
        excluirItem,
        salvarItem,
        fecharForm,
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