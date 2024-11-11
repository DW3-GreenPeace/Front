<template>
    <div>
      <h1>Bem-vindo à Área de Administração</h1>
      <button @click="handleLogout">Logout</button>
      <AdminDashboard />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { logout, isAuthenticated } from '../../services/authService';
  import { useRouter } from 'vue-router';
  import AdminDashboard from '../Adm/AdminDashboard.vue';
  
  export default defineComponent({
    components: { AdminDashboard },
    setup() {
      const router = useRouter();
  
      if (!isAuthenticated()) {
        router.push('/login');
      }
  
      const handleLogout = () => {
        logout();
        router.push('/login');
      };
  
      return { handleLogout };
    }
  });
  </script>
  