<template>
  <div class="auth-container">
    <h3>Edição de Voluntário</h3>
    <form @submit="handleSubmit" class="form">
      <div class="input">
        <div class="input-group">
          <label for="name">Nome</label>
          <input id="name" v-model="name" type="text" placeholder="Digite seu nome" required />
        </div>
        <div class="input-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="email" type="email" placeholder="Digite seu e-mail" required />
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input id="senha" v-model="password" type="password" placeholder="Digite sua senha" />
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
          <input id="telefone" v-model="telefone" type="text" placeholder="Digite seu telefone" maxlength="11" required />
        </div>
        <div class="input-group">
          <label for="age">Idade</label>
          <input id="birth" v-model="birth" type="date" placeholder="Sua Idade" required />
        </div>
      </div>
      <div class="input">
        <div class="input-group">
          <label for="cep">CEP</label>
          <input id="cep" v-model="cep" @input="handleCepChange" type="text" placeholder="Digite seu CEP" maxlength="8" required />
        </div>
        <div class="input-group">
          <label for="endereco">Rua</label>
          <input id="endereco" v-model="endereco" type="text" readonly placeholder="Endereço" required />
        </div>
      </div>
      <div class="input">
        <div class="input-group">
          <label for="cidade">Cidade</label>
          <input id="cidade" v-model="cidade" type="text" readonly placeholder="Cidade" required />
        </div>
        <div class="input-group">
          <label for="bairro">Bairro</label>
          <input id="bairro" v-model="bairro" type="text" readonly placeholder="Bairro" required />
        </div>
        <div class="input-group">
          <label for="numero">Número</label>
          <input id="numero" v-model="phone" type="text" placeholder="Número da casa/apartamento" required />
        </div>
      </div>
      <div class="input-group">
        <label for="skills">Habilidades</label>
        <input id="skills" v-model="skills" type="text" placeholder="Exemplo: Comunicação, Liderança, etc" required />
      </div>
      <p class="mensagem" v-if="mensagem">{{ mensagem }}</p>
      <button type="submit" :disabled="carregando" class="btn-cadastro">
        {{ carregando ? "Salvando..." : "Salvar alterações" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuth } from '../../services/authService';
import env from '../../../env';

export default defineComponent({
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const cep = ref('');
    const endereco = ref('');
    const bairro = ref('');
    const cidade = ref('');
    const birth = ref('');
    const phone = ref('');
    const cpf = ref('');
    const rg = ref('');
    const telefone = ref('');
    const skills = ref('');
    const mensagem = ref('');
    const carregando = ref(false);

    const router = useRouter();
    const usuario = useAuth();
    const userId = localStorage.getItem('volunteerId') || usuario?.id;


    const handleCepChange = async () => {
      if (cep.value.length === 8) {
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`);
          if (data.erro) {
            mensagem.value = 'CEP inválido!';
          } else {
            endereco.value = data.logradouro || '';
            bairro.value = data.bairro || '';
            cidade.value = data.localidade || '';
            mensagem.value = '';
          }
        } catch (error) {
          mensagem.value = 'Erro ao buscar o CEP.';
          console.error(error);
        }
      }
    };

    const carregarDadosVoluntario = async () => {
      if (!userId) {
        mensagem.value = 'ID do voluntário não encontrado.';
        return;
      }
      try {
        const { data } = await axios.get(`${env.url.local}/volunteers/${userId}`);
        name.value = data.name;
        email.value = data.email;
        password.value = data.password;
        cep.value = data.cep;
        endereco.value = data.endereco;
        cpf.value = data.cpf;
        rg.value = data.rg;
        telefone.value = data.telefone;
        skills.value = Array.isArray(data.skills) ? data.skills.join(', ') : '';
      } catch (error) {
        mensagem.value = 'Erro ao carregar os dados do voluntário.';
        console.error(error);
      }
    };

    onMounted(() => {
      carregarDadosVoluntario();
    });

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const dadosAtualizados = {
        name: name.value,
        cpf: cpf.value,
        password: password.value,
        rg: rg.value,
        endereco: endereco.value,
        birth: birth.value,
        email: email.value,
        phone: telefone.value,
        skills: skills.value.split(',').map(skill => skill.trim()),
      };

      carregando.value = true;
      mensagem.value = '';

      try {
        await axios.put(env.url.local + `/volunteers/${userId}`, dadosAtualizados);
        localStorage.setItem("usuario", JSON.stringify(dadosAtualizados));
        mensagem.value = 'Dados atualizados com sucesso!';
        router.push('/volunteer/profile');
      } catch (error) {
        mensagem.value = 'Erro ao salvar as alterações.';
        console.error(error);
      } finally {
        carregando.value = false;
      }
    };

    return {
      name,
      email,
      password,
      cep,
      endereco,
      bairro,
      cidade,
      birth,
      phone,
      cpf,
      rg,
      telefone,
      skills,
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  &[readonly] {
    background: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
}

.mensagem {
  color: red;
  font-size: 0.9rem;
  text-align: center;
}

.btn-cadastro {
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}

.btn-voltar {
  display: inline-block;
  margin-top: 15px;
  background-color: #6c757d;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #5a6268;
  }
}
</style>

