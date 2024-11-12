<template>
  <div class="auth-container">
    <div class="top">
      <div class="logo-form">
        <!-- <img :src="logoSol" alt="Logo" /> -->
      </div>
      <h2>Login</h2>
    </div>
    <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    <form @submit.prevent="handleSubmit" class="form-login">
      <div class="input-group">
        <label>Email:</label>
        <input
          type="email"
          v-model="email"
          required
          placeholder="usuario@exemplo.com"
        />
      </div>
      <div class="input-group">
        <label>Senha:</label>
        <input
          type="password"
          v-model="senha"
          required
          placeholder="Sua senha"
        />
      </div>
      <button type="submit" :disabled="carregando">
        {{ carregando ? 'Entrando...' : 'Login' }}
      </button>
      <div class="cadastro">
        <p>Não possui conta? Clique abaixo</p>
        <button @click="handleCadastroRedirect" class="cadastro-btn">
          Ir para Cadastro
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import env from '../../env.js';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const senha = ref('');
    const mensagem = ref('');
    const carregando = ref(false);
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = async () => {
      mensagem.value = ''; // Limpa mensagens anteriores
      carregando.value = true; // Inicia o estado de carregamento

      // Verificação de campos obrigatórios
      if (!email.value || !senha.value) {
        mensagem.value = 'Por favor, preencha todos os campos.';
        carregando.value = false;
        return;
      }

      try {
        const response = await axios.post(`${env.url.local}/auth`, {
          mode: 'cors',
          email: email.value,
          senha: senha.value,
        });

        // Verifica se o email e a senha são do admin
        if (email.value === env.credentials.master.email && senha.value === env.credentials.master.password) {
          localStorage.setItem('usuario', JSON.stringify({ email: 'adm123@gmail.com', secretaria: true }));
          Swal.fire({
            title: 'Sucesso!',
            text: 'Olá secretária, vamos te redirecionar para a tela.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          router.push('/secretaria'); // Redireciona para a página da secretaria
          return;
        }

        // Verifica se a resposta não foi bem-sucedida
        if (!response.data.status) {
          mensagem.value = response.data.message || 'Erro ao fazer login';
          carregando.value = false;
          return;
        }

        // Armazena os dados do usuário no localStorage e redireciona
        localStorage.setItem('usuario', JSON.stringify(response.data.data));
        router.push('/volunteer/perfil'); // Redireciona para o perfil após o login

      } catch (error) {
        console.error('Erro:', error);
        mensagem.value = 'Login falhou. Tente novamente.';
        carregando.value = false;
      }
    };

    // Função para navegar até a página de cadastro
    const handleCadastroRedirect = () => {
      router.push('/voluntario/form');
    };

    return {
      email,
      senha,
      mensagem,
      carregando,
      handleSubmit,
      handleCadastroRedirect,
    };
  },
});
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-form img {
  width: 50px;
}

h2 {
  margin-top: 10px;
}

.mensagem {
  color: red;
  margin-top: 10px;
}

.form-login {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 20px;
}

.input-group {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.cadastro {
  margin-top: 20px;
}

.cadastro-btn {
  background-color: #f44336;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}

.cadastro-btn:hover {
  background-color: #e53935;
}
</style>
