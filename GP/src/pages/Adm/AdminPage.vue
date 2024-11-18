<template>
    <div class="container">
      <header>
        <h1>Bem-vindo à Área de Administração</h1>
        <button @click="handleLogout">Sair</button>
      </header>
      <AdminDashboard />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { logout, isAuthenticated } from '../../services/authService';
  import { useRouter } from 'vue-router';
  import AdminDashboard from '../Adm/AdminDashboard.vue';
  import DonationReport from './DonationReport.vue';
  
  export default defineComponent({
    components: { AdminDashboard, DonationReport },
    // setup() {
    //   const router = useRouter();
  
    //   if (!isAuthenticated()) {
    //     router.push('/login');
    //   }
  
    //   const handleLogout = () => {
    //     logout();
    //     router.push('/login');
    //   };
  
    //   return { handleLogout };
    // }
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
  .container {
  height: 75dvh;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
  text-align: center;
}

/* Título */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #4a90e2;
}

/* Botão de logout */
button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #357abd;
}

header{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>