<!-- Cadastro.vue -->
<template>
  <div class="auth-container">
    <div class="top">
      <div class="logo-form">
      </div>
      <h2>Cadastro Voluntário</h2>
    </div>
    <form class="register">
      
      <div class="inputone">

      <div class="input-group">
        <label for="">Nome</label>
        <input type="text">
      </div>
      <div class="input-group">
          <label for="">Email</label>
          <input type="text">
        </div>
      </div>
      <div class="input">
        
        <div class="input-group">
          <label for="">Data de Nascimento</label>
          <input type="date">
        </div>
        <div class="input-group">
          <label for="">CPF</label>
          <input type="text">
        </div>
        <div class="input-group">
          <label for="">RG</label>
          <input type="text">
        </div>
      </div>
      <div class="input">
        
        <div class="input-group">
          <label for="">Telefone:</label>
          <input type="text">
        </div>
        <div class="input-group">
          <label for="">CEP</label>
          <input type="text">
        </div>
        <div class="input-group">
          <label for="">Rua</label>
          <input type="text">
        </div>
        
      </div>
      <div class="input">
        <div class="input-group">
          <label for="">Número°</label>
          <input type="text">
        </div>
        <div class="input-group">
          <label for="">Bairro</label>
          <input type="text">
        </div>
        <div class="input-group">
          <label for="">Cidade</label>
          <input type="text">
        </div>
      </div>
      <div class="input-group">
          <label for="">Habilidades:</label>
          <input type="text">
        </div>
      <button type="submit" class="btn-cadastro">
        Cadastrar
      </button>
    </form>
    <div class="login">
        <p>Já possui conta? Clique abaixo</p>
        <button class="login-btn">
          Ir para Login
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
// import env from '../../env.js';

export default defineComponent({
  // setup() {
  //   const formData = ref({
  //     nome: '',
  //     email: '',
  //     senha: '',
  //     cep: '',
  //     rua: '',
  //     bairro: '',
  //     cidade: '',
  //     cpf: '',
  //     rg: '',
  //     telefone: '',
  //   });

  //   const fields = [
  //     { name: "nome", label: "Nome", type: "text" },
  //     { name: "email", label: "Email", type: "email" },
  //     { name: "senha", label: "Senha", type: "password" },
  //     { name: "cep", label: "CEP", type: "text", placeholder: "Somente números", maxLength: 8 },
  //     { name: "rua", label: "Rua", type: "text", disabled: true, placeholder: "Digite seu CEP" },
  //     { name: "bairro", label: "Bairro", type: "text", disabled: true, placeholder: "Digite seu CEP" },
  //     { name: "cidade", label: "Cidade", type: "text", disabled: true, placeholder: "Digite seu CEP" },
  //     { name: "cpf", label: "CPF", type: "text", maxLength: 11, placeholder: "Apenas números" },
  //     { name: "rg", label: "RG", type: "text", maxLength: 9, placeholder: "Apenas números" },
  //     { name: "telefone", label: "Telefone", type: "text", maxLength: 11, placeholder: "Apenas números" },
  //   ];

  //   const carregando = ref(false);
  //   const mensagem = ref('');
  //   const router = useRouter();

  //   const buscarEndereco = async (cep: string) => {
  //     try {
  //       const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  //       if (resposta.data.erro) {
  //         mensagem.value = 'CEP não encontrado.';
  //         formData.value.rua = '';
  //         formData.value.bairro = '';
  //         formData.value.cidade = '';
  //       } else {
  //         formData.value.rua = resposta.data.logradouro;
  //         formData.value.bairro = resposta.data.bairro;
  //         formData.value.cidade = resposta.data.localidade;
  //         mensagem.value = '';
  //       }
  //     } catch (error) {
  //       mensagem.value = 'Erro ao buscar o CEP.';
  //       console.error('Erro ao buscar CEP:', error);
  //     }
  //   };

  //   const handleCepChange = (e: Event) => {
  //     const valorCep = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  //     formData.value.cep = valorCep;
  //     if (valorCep.length === 8) {
  //       buscarEndereco(valorCep);
  //     } else {
  //       formData.value.rua = '';
  //       formData.value.bairro = '';
  //       formData.value.cidade = '';
  //     }
  //   };

  //   const handleSubmit = async () => {
  //     if (!Object.values(formData.value).every((field) => field)) {
  //       mensagem.value = 'Por favor, preencha todos os campos.';
  //       return;
  //     }

  //     const dadosUsuario = { ...formData.value, adm: 0, id_paroquia: null };
  //     carregando.value = true;
  //     mensagem.value = '';

  //     try {
  //       const resposta = await axios.post(`${env.url.local}/user/register`, dadosUsuario);
  //       if (resposta.data.status) {
  //         Swal.fire({
  //           title: 'Sucesso!',
  //           text: 'Cadastro Feito com Sucesso!',
  //           icon: 'success',
  //           confirmButtonText: 'Ok',
  //         }).then((result) => {
  //           if (result.isConfirmed) router.push('/login');
  //         });
  //       } else {
  //         mensagem.value = resposta.data.message;
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         mensagem.value = `Erro: ${error.response.data.message}`;
  //       } else {
  //         mensagem.value = `Erro de conexão: ${error.message}`;
  //       }
  //       console.error('Erro:', error);
  //     } finally {
  //       carregando.value = false;
  //     }
  //   };

  //   return {
  //     formData,
  //     fields,
  //     carregando,
  //     mensagem,
  //     handleCepChange,
  //     handleSubmit,
  //   };
  // },
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

  .input, .inputone {
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
  margin-top: 20px;
}

.login-btn {
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 8px;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-btn:hover {
  background-color: #caeaff;
}
</style>
