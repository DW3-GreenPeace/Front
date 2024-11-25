<template>
  <div v-if="which === 'usuario'">
    <header>
      <div class="logo">
        <h1>GreenPeace</h1>
      </div>
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/campaigns">Campanhas</router-link></li>
        <li><router-link to="/doacoes">Doar</router-link></li>
      </ul>
      <button @click="perfil">Perfil</button>
    </header>
  </div>


  <header v-else-if="which === 'adm'">
    <div class="logo">
      <h1>GreenPeace</h1>
    </div>
    <ul>
      <li><router-link to="/adm/dashboard">Dashboard</router-link></li>
      <li><router-link to="/adm/doacoes">Relatórios</router-link></li>
      <li><router-link to="/adm/usuarios">Gerenciar Usuários</router-link></li>
    </ul>
    <button @click="logout">Sair</button>
  </header>

  <header v-else>
    <div class="logo">
      <h1>GreenPeace</h1>
    </div>
    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/campaigns">Campanhas</router-link></li>
      <li><router-link to="/temas">Temas</router-link></li>
      <li><router-link to="/doacoes">Doar</router-link></li>
    </ul>
    <div class="button">
      <button @click="login">Entrar</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    which: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("usuario");
      location.reload(); // Recarrega para redefinir o estado
    };

    const login = () => {
      router.push("/login"); // Redireciona para a página de login
    };

    const perfil = () => {
      router.push("/volunteer/profile"); // Redireciona para a página de login
    };

    return {
      logout,
      perfil,
      login,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

a,
h1,
p,
h2,
h3,
label {
  font-family: "Poppins", sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6dvh;
  padding: 15px 30px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 1.8rem;
  color: #009a60;
  font-weight: bold;
}

ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s;
}

ul li a:hover {
  color: #009a60;
}

.button {
  display: flex;
}

button {
  padding: 8px 15px;
  background-color: #009a60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #007a4d;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  ul {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .button {
    margin-top: 15px;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.5rem;
  }

  ul li a {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}
</style>
