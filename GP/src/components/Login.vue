<template>
  <div class="auth-container">
    <div class="top">
      <div class="logo-form">
        <!-- <img :src="logoSol" alt="Logo" /> -->
      </div>
      <h2>Login</h2>
    </div>
    <!-- <p v-if="mensagem" class="mensagem">{{ mensagem }}</p> -->
    <form class="form-login" @click="handleSubmit">
      <div class="input-group">
        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="usuario@exemplo.com"
        />
      </div>
      <div class="input-group">
        <label>Senha:</label>
        <input
          type="password"
          required
          placeholder="Sua senha"
        />
      </div>
      <button type="submit">
        Login
      </button>
      <div class="cadastro">
        <p>Não possui conta? Clique abaixo</p>
        <button class="cadastro-btn" @click="handleCadastroRedirect">
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
          localStorage.setItem('usuario', JSON.stringify({ email: 'adm123@gmail.com', adm: true }));
          Swal.fire({
            title: 'Sucesso!',
            text: 'Olá secretária, vamos te redirecionar para a tela.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          router.push('/admin'); // Redireciona para a página da secretaria
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
       router.push('/register');
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
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  a, h1, p, h2, h3, label{
    font-family: "Poppins", serif;
  }

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
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
    width: 100%;
    padding: 10px;
    background-color: rgb(31, 177, 1);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }

button:disabled {
  background-color: #ccc;
}

.cadastro {
  margin-top: 20px;
}

.cadastro-btn {
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 8px;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cadastro-btn:hover {
  background-color: #caeaff;
}



.input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: rgba(237, 242, 248, 1);
    color: #333;
  }
</style>
