<template>
  <section class="volunteer">
    <h1>Seja nosso voluntário. Seja a Voz que ecoa por um Futuro Sustentável!</h1>
    <h2>Venha Fazer Parte desse TIME!</h2>
    <button @click="goToCadastro"><h2>Quero Ser Voluntário!!</h2></button>
  </section>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: 'Volunteer',
  setup() {
    const router = useRouter();

    // Função para redirecionar para a página de cadastro
    const goToCadastro = () => {
      router.push("/register");
    };

    return { goToCadastro };
  }
};
</script>

<style scoped>
h1,h2{
  color: #fff;
  text-align: left;
}
h1{
  font-size: 3rem;
  width: 60%;
}
.volunteer {
  margin: 30px;
  text-align: center;
  display: flex;
  align-items: self-start;
  flex-direction: column;
  justify-content: center;
  background-image: url('../../assets/voluntarios.jpeg'); /* Imagem de fundo */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 50px;
  border-radius: 10px;
  height: 50dvh;
  position: relative;
}

button {
  background-color: #00cc00;
  color: white;
  padding: 10px 20px;
  width: 30%;
  height: 10dvh;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  position: absolute;
  right: 5%;
  bottom: 10dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #009900;
}
</style>
