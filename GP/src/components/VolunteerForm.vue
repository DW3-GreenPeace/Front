<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="volunteer.name" required />
      </div>
      
      <div>
        <label for="age">Idade:</label>
        <input type="number" id="age" v-model.number="volunteer.age" required min="18" />
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="volunteer.email" required />
      </div>
      
      <div>
        <label for="phone">Telefone:</label>
        <input type="tel" id="phone" v-model="volunteer.phone" required />
      </div>

      <div>
        <label for="rg">RG:</label>
        <input type="number" id="rg" v-model="volunteer.rg" required placeholder="Digite Somento Números"/>
      </div>

      <div>
        <label for="cpf">CPF:</label>
        <input type="number" id="cpf" v-model="volunteer.cpf" required placeholder="Digite Somento Números"/>
      </div>
      
      <button type="submit">Cadastrar</button>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  interface Volunteer {
    name: string;
    age: number;
    email: string;
    phone: string;
    rg: string;
    cpf: string;
  }
  
  export default defineComponent({
    name: 'VolunteerForm',
    setup() {
      const volunteer = reactive<Volunteer>({
        name: '',
        age: 18,
        email: '',
        phone: '',
        rg: '',
        cpf: '',
      });
  
      const submitForm = () => {
        // Lógica para enviar os dados, como uma chamada a uma API.
        console.log("Dados do voluntário:", volunteer);
        alert('Cadastro realizado com sucesso!');
        // Limpa o formulário
        volunteer.name = '';
        volunteer.age = 18;
        volunteer.email = '';
        volunteer.phone = '';
      };
  
      return {
        volunteer,
        submitForm,
      };
    },
  });
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    font-size: 24px;
    color: #343a40;
    margin-bottom: 1rem;
  }
  
  div {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-size: 14px;
    color: #495057;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="number"] {
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #ced4da;
    color: #26282b
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="tel"]:focus,
  input[type="number"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
  
  button {
    margin-top: 10px;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  </style>
  
  