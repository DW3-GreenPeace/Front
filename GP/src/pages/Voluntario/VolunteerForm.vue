<template>
  <div class="auth-container">
    <div class="top">
      <div class="logo-form">
      </div>
      <h2>Cadastro Voluntário</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label>Nome:</label>
        <input v-model="nome" type="text" required />
      </div>
      <div class="input-group">
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="input-group">
        <label>Senha:</label>
        <input v-model="senha" type="password" required />
      </div>
      <div class="input-group">
        <label>CEP:</label>
        <input
          v-model="cep"
          type="text"
          max-length="8"
          @input="handleCepChange"
          required
          placeholder="Somente números"
        />
      </div>
      <div class="input-group">
        <label>Rua:</label>
        <input
          v-model="rua"
          type="text"
          required
          placeholder="Digite seu CEP"
          :disabled="!rua"
        />
      </div>
      <div class="input-group">
        <label>Bairro:</label>
        <input
          v-model="bairro"
          type="text"
          required
          placeholder="Digite seu CEP"
          :disabled="!bairro"
        />
      </div>
      <div class="input-group">
        <label>Cidade:</label>
        <input
          v-model="cidade"
          type="text"
          required
          placeholder="Digite seu CEP"
          :disabled="!cidade"
        />
      </div>
      <div class="input-group">
        <label>CPF:</label>
        <input
          v-model="cpf"
          type="text"
          required
          max-length="11"
          placeholder="Apenas números"
        />
      </div>
      <div class="input-group">
        <label>RG:</label>
        <input
          v-model="rg"
          type="text"
          required
          max-length="9"
          placeholder="Apenas números"
        />
      </div>
      <div class="input-group">
        <label>Telefone:</label>
        <input
          v-model="telefone"
          type="text"
          required
          max-length="11"
          placeholder="Apenas números"
        />
      </div>
      <button :disabled="carregando" class="btn-cadastro">
        {{ carregando ? 'Cadastrando...' : 'Cadastrar' }}
      </button>
      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import env from '../../../env';

export default defineComponent({
  setup() {
    const nome = ref('');
    const email = ref('');
    const senha = ref('');
    const cep = ref('');
    const rua = ref('');
    const bairro = ref('');
    const cidade = ref('');
    const cpf = ref('');
    const rg = ref('');
    const telefone = ref('');
    const mensagem = ref('');
    const carregando = ref(false);

    const router = useRouter();

    // Função para buscar endereço pelo CEP
    const buscarEndereco = async (cep: string) => {
      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (resposta.data.erro) {
          mensagem.value = 'CEP não encontrado.';
          rua.value = '';
          bairro.value = '';
          cidade.value = '';
        } else {
          rua.value = resposta.data.logradouro;
          bairro.value = resposta.data.bairro;
          cidade.value = resposta.data.localidade;
          mensagem.value = '';
        }
      } catch (error) {
        mensagem.value = 'Erro ao buscar o CEP.';
        console.error('Erro ao buscar CEP:', error);
      }
    };

    const handleCepChange = (e: Event) => {
      const valorCep = (e.target as HTMLInputElement).value.replace(/\D/g, '');
      cep.value = valorCep;

      if (valorCep.length === 8) {
        buscarEndereco(valorCep);
      } else {
        rua.value = '';
        bairro.value = '';
        cidade.value = '';
      }
    };

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!nome.value || !email.value || !senha.value || !cep.value || !rua.value || !bairro.value || !cidade.value || !cpf.value || !rg.value || !telefone.value) {
        mensagem.value = 'Por favor, preencha todos os campos.';
        return;
      }

      const dadosUsuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        cpf: cpf.value,
        rg: rg.value,
        telefone: telefone.value,
        adm: 0,
        id_paroquia: null,
      };

      carregando.value = true;
      mensagem.value = '';

      try {
        const resposta = await axios.post(env.url.local + '/user/register', dadosUsuario);

        if (resposta.data.status === true) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro Feito com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/login');
            }
          });
        } else {
          mensagem.value = resposta.data.message;
        }
      } catch (error: any) {
        if (error.response) {
          mensagem.value = `Erro: ${error.response.data.message}`;
        } else {
          mensagem.value = `Erro de conexão: ${error.message}`;
        }
        console.error('Erro:', error);
      } finally {
        carregando.value = false;
      }
    };

    return {
      nome,
      email,
      senha,
      cep,
      rua,
      bairro,
      cidade,
      cpf,
      rg,
      telefone,
      mensagem,
      carregando,
      handleSubmit,
      handleCepChange,
    };
  },
});
</script>

<style scoped>
.auth-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top {
  text-align: center;
  margin-bottom: 20px;
}

.logo-form img {
  max-width: 100px;
  margin-bottom: 10px;
}

h2 {
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group input:disabled {
  background-color: #f2f2f2;
}

.btn-cadastro {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-cadastro:disabled {
  background-color: #d6d6d6;
}

.mensagem {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
</style>
