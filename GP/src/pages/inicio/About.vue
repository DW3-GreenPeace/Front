<template>
  <section class="about">
    <h1>Quem Somos</h1>
    <h2>Conectamos Pessoas à Causa</h2>
    <div class="card">
      <div class="card-content" v-for="about in about" :key="about.id">
        <div class="card-text">
          <p>{{ about.text }}</p>
        </div>
        <div class="card-image">
          <img v-if="about.image" :src="about.image" alt="Sobre nós" class="img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import env from "../../../env"; // Certifique-se de configurar corretamente seu ambiente

interface AboutData {
  id: string;
  text: string;
  image: string;
}

export default defineComponent({
  name: 'About',
  setup() {
    // Usando um objeto para armazenar os dados da API
    const about = ref<AboutData[]>([]);

    // Função para carregar as informações "Sobre"
    const loadAboutData = async () => {
      try {
        const response = await axios.get(`${env.url.local}/about`, {
          headers: {
             "ngrok-skip-browser-warning": "true",
          },
          mode: 'cors',
        });
        about.value = response.data.data;
        // Verifica se a resposta tem dados
      } catch (error) {
        console.error("Erro ao carregar informações:", error);
      }
    };

    // Carregar os dados ao montar o componente
    onMounted(() => {
      loadAboutData();
    });

    return {
      about
    };
  },
});
</script>

<style scoped>
.about {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.card {
  width: 80%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.card-text {
  flex: 1;
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
}

.card-image img {
  width: 400px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
    align-items: center;
  }

  .card-image img {
    width: 100%;
    max-width: 400px;
  }
}
</style>
