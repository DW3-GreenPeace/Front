<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <label>Usuário:</label>
        <input v-model="username" type="text" required />
        
        <label>Senha:</label>
        <input v-model="password" type="password" required />
  
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { login } from '../services/authService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const handleLogin = async () => {
        const success = await login(username.value, password.value);
        if (success) {
          router.push('/admin');
        } else {
          errorMessage.value = 'Usuário ou senha incorretos';
        }
      };
  
      return { username, password, errorMessage, handleLogin };
    }
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  