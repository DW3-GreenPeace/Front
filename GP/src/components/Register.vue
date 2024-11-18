<!-- Cadastro.vue -->
<template>
  <div class="auth-container">
    <h3>Cadastro de Voluntário</h3>
    <form @submit="handleSubmit" class="form">
      <div class="input">
        <div class="input-group">
          <label for="name">name</label>
          <input id="name" v-model="name" type="text" placeholder="Digite seu name" required />
        </div>

        <div class="input-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="email" type="email" placeholder="Digite seu e-mail" required />
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input id="senha" v-model="senha" type="password" placeholder="Digite sua senha" required />
        </div>
      </div>
      <div class="input">
        <div class="input-group">
          <label for="cpf">CPF</label>
          <input id="cpf" v-model="cpf" type="text" placeholder="Digite seu CPF" maxlength="11" required />
        </div>

        <div class="input-group">
          <label for="rg">RG</label>
          <input id="rg" v-model="rg" type="text" placeholder="Digite seu RG" maxlength="11" required />
        </div>

        <div class="input-group">
          <label for="telefone">Telefone</label>
          <input id="telefone" v-model="telefone" type="text" placeholder="Digite seu telefone" required />
        </div>
      </div>
      <div class="input">
        <div class="input-group">
          <label for="age">Idade</label>
          <input id="age" v-model="age"  type="number" placeholder="Sua Idade" maxlength="2"
            required />
        </div>
        <div class="input-group">
          <label for="cep">CEP</label>
          <input id="cep" v-model="cep" @input="handleCepChange" type="text" placeholder="Digite seu CEP" maxlength="8"
            required />
        </div>

        <div class="input-group">
          <label for="endereco">Rua</label>
          <input id="endereco" v-model="endereco" type="text" readonly
            placeholder="endereco será preenchida automaticamente" required />
        </div>

        
      </div>
      <div class="input">
        <div class="input-group">
          <label for="cidade">Cidade</label>
          <input id="cidade" v-model="cidade" type="text" readonly placeholder="Cidade será preenchida automaticamente"
            required />
        </div>
        <div class="input-group">
          <label for="bairro">Bairro</label>
          <input id="bairro" v-model="bairro" type="text" readonly placeholder="Bairro será preenchido automaticamente"
            required />
        </div>
        <div class="input-group">
          <label for="cidade">Número da Casa/Apartamento</label>
          <input id="cidade" type="text" required />
        </div>
      </div>

      <div class="input-group">
        <label for="skills">Hablidades</label>
        <input id="cidade" v-model="skills" type="text" placeholder="Exemplo: Comunicação, Liderança, etc"
          required />
      </div>
      <p class="mensagem" v-if="mensagem">{{ mensagem }}</p>
      <button type="submit" :disabled="carregando" class="btn-cadastro">
        {{ carregando ? "Cadastrando..." : "Cadastrar" }}
      </button>
    </form>

    <div class="login">
      <p>Já tem Conta? Clique abaixo</p>
      <button class="login-btn" @click="login">
       <p>Login</p> 
      </button>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import env from '../../env';

export default defineComponent({
  setup() {
    const name = ref('');
    const email = ref('');
    const senha = ref('');
    const cep = ref('');
    const endereco = ref('');
    const age = ref('');
    const bairro = ref('');
    const cidade = ref('');
    const cpf = ref('');
    const rg = ref('');
    const telefone = ref('');
    const skills = ref('');
    const mensagem = ref('');
    const carregando = ref(false);

    const router = useRouter();

    const buscarEndereco = async (cep: string) => {
      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (resposta.data.erro) {
          mensagem.value = 'CEP não encontrado.';
          endereco.value = '';
          bairro.value = '';
          cidade.value = '';
        } else {
          endereco.value = resposta.data.logradouro;
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
        endereco.value = '';
        bairro.value = '';
        cidade.value = '';
      }
    };

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!name.value || !email.value || !senha.value || !cep.value || !endereco.value || !bairro.value || !cidade.value || !cpf.value || !rg.value || !telefone.value || !skills.value) {
        mensagem.value = 'Por favor, preencha todos os campos.';
        return;
      }

      const dadosUsuario = {
        name: name.value,
        cpf: cpf.value,
        rg: rg.value,
        endereco: endereco.value,
        age: age.value,
        email: email.value,
        skills: skills.value,
        // senha: senha.value,
        // telefone: telefone.value,
      };

      carregando.value = true;
      mensagem.value = '';

      try {
        const resposta = await axios.post(env.url.local + '/volunteers', dadosUsuario,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          }
        );

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
    const login = async () => {
      router.push("/login")
    }
    return {
      name,
      email,
      senha,
      age,
      cep,
      endereco,
      bairro,
      cidade,
      cpf,
      rg,
      telefone,
      skills,
      login,
      mensagem,
      carregando,
      handleSubmit,
      handleCepChange,
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

.auth-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  height: 92dvh;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 1rem; */
}

.logo-form img {
  width: 80px;
  height: auto;
  margin-bottom: 0.5rem;
}

.input,
.inputone {
  width: 96%;
  display: flex;
  justify-content: space-between;
  text-align: left;
}

.input .input-group {
  width: 30%;
}

.inputone .input-group {
  width: 48%;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.3rem;
}

.input-group input {
  width: 95%;
  padding: 0.8rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #6c63ff;
}

.btn-cadastro {
  width: 100%;
  padding: 0.8rem;
  background-color: #6c63ff;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cadastro:hover {
  background-color: #5752c9;
}

.mensagem {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1.5rem;
  }

  .btn-cadastro {
    font-size: 0.9rem;
  }
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login-btn {
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 8px;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}

.login-btn:hover {
  background-color: #caeaff;
}
</style>
