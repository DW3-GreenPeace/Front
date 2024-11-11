// /router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../components/Login.vue';
import AdminPage from '../pages/Adm/AdminPage.vue';
import AdminDashboard from '../pages/Adm/AdminDashboard.vue';
import CampaignDetails from '../pages/Campanha/CampaignDetails.vue';
import CampaignForm from '../pages/Campanha/CampaignForm.vue';
import CampaignList from '../pages/Campanha/CampaignList.vue';
import Inicio from '../pages/inicio/Inicio.vue';
import VolunteerDetails from '../pages/Voluntario/VolunteerDetails.vue';
import VolunteerForm from '../pages/Voluntario/VolunteerForm.vue';
import VolunteerList from '../pages/Voluntario/VolunteerList.vue';
import { isAuthenticated, isAdmin } from '../services/authService';

const routes: Array<RouteRecordRaw> = [
  // Rota de Login
  { path: '/login', component: Login },

  // Rota da página inicial (acesso público)
  { path: '/inicio', component: Inicio },

  // Rotas protegidas da seção "Adm"
  {
    path: '/admin',
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next();
      else next('/login');
    },
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next();
      else next('/login');
    },
  },

  // Rotas protegidas da seção "Campanha" (apenas para administradores)
  {
    path: '/campanha/details',
    component: CampaignDetails,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },
  {
    path: '/campanha/form',
    component: CampaignForm,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },
  {
    path: '/campanha/list',
    component: CampaignList,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },

  // Rotas protegidas da seção "Voluntario" (apenas lista de voluntários para administradores)
  {
    path: '/voluntario/details',
    component: VolunteerDetails,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next();
      else next('/login');
    },
  },
  {
    path: '/voluntario/form',
    component: VolunteerForm,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next();
      else next('/login');
    },
  },
  {
    path: '/voluntario/list',
    component: VolunteerList,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
