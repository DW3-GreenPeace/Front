import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../components/Login.vue';
import AdminPage from '../pages/Adm/AdminPage.vue';
import AdminDashboard from '../pages/Adm/AdminDashboard.vue';
import DonationReport from '../pages/Adm/DonationReport.vue';
import CampaignDetails from '../pages/Campanha/CampaignDetails.vue';
import CampaignForm from '../pages/Campanha/CampaignForm.vue';
import CampaignList from '../pages/Campanha/CampaignList.vue';
import Inicio from '../pages/inicio/Inicio.vue';
import Register from '../components/Register.vue';
import VolunteerDetails from '../pages/Voluntario/VolunteerDetails.vue';
import VolunteerForm from '../pages/Voluntario/VolunteerForm.vue';
import VolunteerList from '../pages/Voluntario/VolunteerList.vue';
import VolunteerProfile from '../pages/Voluntario/VolunteerProfile.vue';
import CampaingAll from '../pages/Campanha/CampaingAll.vue';
import CampaignCreate from '../pages/Campanha/CampaignCreate.vue';

import { isAuthenticated, isAdmin, isVolunteer } from '../services/authService';

const routes: Array<RouteRecordRaw> = [
  // Rota de Login
  { path: '/login', component: Login },

  {path: '/register', component: Register},

  // Rota da página inicial (acesso público)
  { path: '/', component: Inicio },

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
  {
    path: '/admin/relatorio',
    component: DonationReport,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },

  // Rotas protegidas da seção "Campanha" (apenas para administradores)
  {
    path: '/campanha/details/:id',
    component: CampaignDetails,
  },
  {
    path: '/admin/campanha/form/create',
    component: CampaignCreate,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },
  {
    path: '/admin/campanha/list',
    component: CampaignList,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },
  {
    path: '/campanha/list',
    component: CampaingAll,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isAdmin()) next();
      else next('/login');
    },
  },

  // Rotas protegidas da seção "Voluntario" (apenas lista de voluntários para administradores)
  { 
    path: '/admin/volunteer/:id',
    component: VolunteerDetails,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next();
      else next('/login');
    },
    props: true,
  },
  { 
    path: '/volunteer/perfil',
    component: VolunteerProfile,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated() && isVolunteer()) next();
      else next('/login');
    },
    props: true,
  },
  {
    path: '/voluntario/form',
    component: VolunteerForm,
  },
  {
    path: '/admin/voluntario/list',
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
