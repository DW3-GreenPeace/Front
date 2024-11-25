<template>
  <div class="form-container">
    <h2>{{ itemEditar ? 'Editar' : 'Adicionar' }} Entrada</h2>
    <form @submit.prevent="salvarItem">
      <div>
        <label for="texto">Texto:</label>
        <textarea v-model="item.texto" id="texto" required></textarea>
      </div>
      <div>
        <label for="imagem">Imagem:</label>
        <input type="file" @change="handleFileUpload" id="imagem" />
        <div v-if="item.img">
          <img :src="item.img" alt="Imagem" width="150" />
        </div>
      </div>
      <div class="form-actions">
        <button type="submit">{{ itemEditar ? 'Salvar Alterações' : 'Adicionar Entrada' }}</button>
        <button type="button" @click="fecharForm">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from 'vue';

export default defineComponent({
  props: {
    itemEditar: Object,
  },
  setup(props, { emit }) {
    const item = ref({
      id: '',
      texto: '',
      img: null as string | null,
    });

    watch(
      () => props.itemEditar,
      (newItem) => {
        if (newItem) {
          item.value = { ...newItem };
        }
      },
      { immediate: true }
    );

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          item.value.img = reader.result as string;
        };
        reader.readAsDataURL(target.files[0]);
      }
    };

    const salvarItem = () => {
      emit('salvar', item.value);
      fecharForm();
    };

    const fecharForm = () => {
      emit('fechar');
    };

    return {
      item,
      handleFileUpload,
      salvarItem,
      fecharForm,
    };
  },
});
</script>

<style scoped>
/* Estilos do formulário */
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

button {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3b7ac8;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

img {
  margin-top: 10px;
  max-width: 150px;
}
</style>
