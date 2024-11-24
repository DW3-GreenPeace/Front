<template>
  <div class="login-container">
    <div class="login">
      <div class="top">
        <div class="logo-form">
          <!-- <img :src="logoSol" alt="Logo" /> -->
        </div>
        <h2>Login</h2>
      </div>
      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
      <form @submit.prevent="handleSubmit" class="form-login">
        <div class="input-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="usuario@exemplo.com"
          />
        </div>
        <div class="input-group">
          <label for="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            v-model="password"
            required
            placeholder="Sua senha"
          />
        </div>
        <button :disabled="carregando" type="submit">
          {{ carregando ? 'Entrando...' : 'Login' }}
        </button>
        <div class="cadastro">
          <p>Não possui conta? Clique abaixo</p>
          <button @click="handleCadastroRedirect" type="button" class="cadastro-btn">
            Ir para Cadastro
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import env from "/env.js"; // Ajuste o caminho conforme necessário

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const mensagem = ref("");
    const carregando = ref(false);

    const router = useRouter();

    const handleSubmit = async () => {
      mensagem.value = "";
      carregando.value = true;

      if (!email.value || !password.value) {
        mensagem.value = "Por favor, preencha todos os campos.";
        carregando.value = false;
        return;
      }

      try {
        const fetched = await fetch(env.url.local + "/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        body: JSON.stringify({ email: email.value, password: password.value }),
        });

        const response = await fetched.json();

        if (email.value === env.credentials.master.email && password.value === env.credentials.master.password) {
          Swal.fire({
            title: "Sucesso!",
            text: "Olá Administração, vamos te redirecionar para a tela.",
            icon: "success",
            confirmButtonText: "Ok",
          });
          router.push("/admin");

          localStorage.setItem(
            "adm",
            JSON.stringify({
              email: "adm123@gmail.com",
              adm: true
            })
          );

         
          return;
        }

        if (!response.status) {
          mensagem.value = response.message || "Erro ao fazer login";
          carregando.value = false;
          return;
        }
        localStorage.setItem("usuario", JSON.stringify(response.data));
        router.push("/inicio/volunteer");
      } catch (error) {
        console.error("Erro:", error);
        mensagem.value = "Login falhou. Tente novamente.";
      } finally {
        carregando.value = false;
      }
    };

    const handleCadastroRedirect = () => {
      router.push("/register");
    };

    return {
      email,
      password,
      mensagem,
      carregando,
      handleSubmit,
      handleCadastroRedirect,
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
label {
  font-family: "Poppins", serif;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 40%;
}

.top {
  margin-bottom: 20px;
}

.logo-form img {
  width: 80px;
  height: 80px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
  width: 95%;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #1ab80c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.cadastro button{
  background-color: #f5f5f5;
  color: black;
  border: #ddd solid 1px;
}

.cadastro-btn:hover{
  background-color: #c7c6c6;
}

button:disabled {
  background-color: #b3d7ff;
}

button:hover {
  background-color: #1f8001;
}

.mensagem {
  color: red;
  margin-bottom: 15px;
}
</style>
