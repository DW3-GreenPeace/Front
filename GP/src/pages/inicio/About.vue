<template>
    <section class="about">
      <h1>Quem Somos</h1>
      <h2>Conectamos Pessoas à Causa</h2>
      <div class="sobre">
        <img v-if="aboutImage" :src="aboutImage" alt="Sobre nós" class="img" />
        <p v-if="aboutText">{{ aboutText }}</p>
        <p v-else>Carregando informações...</p>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  import env from "../../../env"; // Substitua pelo caminho do seu arquivo de configuração
  
  export default {
    name: "About",
    data() {
      return {
        aboutText: "", // Armazena o texto recuperado da API
        aboutImage: "", // Armazena a URL da imagem recuperada da API
      };
    },
    async created() {
      try {
        const response = await axios.get(`${env.url.local}/about`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        // Atualiza os dados recuperados da API
        this.aboutText = response.data.text || "Conteúdo não disponível no momento.";
        this.aboutImage = response.data.image || ""; // Espera um campo "image" na resposta da API
      } catch (error) {
        console.error("Erro ao carregar informações:", error);
        this.aboutText = "Erro ao carregar informações sobre quem somos.";
      }
    },
  };
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
.sobre{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10%;
}
.sobre img{
    width: 500px;
}
.sobre p{
    text-align: left;
    line-height: 2;
    font-size: 1.1rem
}
</style>