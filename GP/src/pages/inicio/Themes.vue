<template>
    <div class="container">
      <h1>Temas Relacionados</h1>
      
      <div class="themes-container">
        <div class="theme-card" v-for="theme in themes" :key="theme.id">
          <div class="theme-info">
            <h2 class="theme-title">{{ theme.title }}</h2>
            <p class="theme-text">{{ theme.text }}</p>
          </div>
          <div class="theme-image">
            <img :src="theme.image" alt="Imagem do Tema" class="img-preview" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import env from '../../../env'; // Certifique-se de configurar corretamente seu ambiente
  import { useRouter } from 'vue-router';
  
  interface Theme {
    id: string;
    title: string;
    text: string;
    image: string;
  }
  
  export default defineComponent({
    setup() {
      const themes = ref<Theme[]>([]);
      const router = useRouter();
  
      // Função para carregar os temas
      const loadThemes = async () => {
        try {
          const response = await axios.get(`${env.url.local}/topics`, {
            headers: { "ngrok-skip-browser-warning": "true" },
            mode: "cors",
          });
          themes.value = response.data.data; // Ajuste conforme a estrutura do seu JSON
        } catch (error) {
          console.error('Erro ao buscar temas:', error);
        }
      };
  
      // Navegar para os detalhes de um tema
      const viewDetails = (id: string) => {
        router.push(`/themes/${id}`);
      };
  
      // Editar um tema
      const editTheme = (id: string) => {
        router.push(`/themes/edit/${id}`);
      };
  
      // Excluir um tema
      const deleteTheme = async (id: string) => {
        const confirmDelete = confirm('Tem certeza que deseja excluir este tema?');
        if (confirmDelete) {
          try {
            await axios.delete(`${env.url.local}/topics/${id}`, {
              headers: { "ngrok-skip-browser-warning": "true" },
            });
            // Remove o tema da lista local sem recarregar a página
            themes.value = themes.value.filter(theme => theme.id !== id);
            alert('Tema excluído com sucesso!');
          } catch (error) {
            console.error('Erro ao excluir tema:', error);
            alert('Erro ao excluir tema.');
          }
        }
      };
  
      // Voltar para a administração
      const backAdmin = () => router.push('/admin');
  
      // Carregar os temas ao montar o componente
      onMounted(() => {
        loadThemes();
      });
  
      return {
        themes,
        editTheme, 
        viewDetails,
        deleteTheme,
        backAdmin,
      };
    },
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
  td, th {
    font-family: "Poppins", serif;
  }
  
  .container {
    max-width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 24px;
    color: black;
    margin-bottom: 20px;
    text-align: center;
  }
  
p{
    width: 50%;
}

  .btn-back {
    background-color: #0396f8;
  }
  .btn-back:hover {
    background-color: #0095c2;
  }
  
  /* Cards */
  .themes-container {
   display: flex;
   flex-direction: column

  }
  
  .theme-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    margin: 30px;
  }
  
  .theme-info {
    flex: 1;
    margin-right: 15px;
  }
  
  .theme-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
  
  .theme-text {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
    width: 50%;
  }
  
  .theme-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  </style>
  