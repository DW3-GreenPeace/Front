import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import AdminPage from '../pages/Adm/AdminPage.vue';
import AdminDashboard from '../pages/Adm/AdminDashboard.vue';
import DonationReport from '../pages/Adm/DonationReport.vue';
import CampaignDetails from '../pages/Campanha/CampaignDetails.vue';
import CampaignForm from '../pages/Campanha/CampaignForm.vue';
import CampaignList from '../pages/Campanha/CampaignList.vue';
import CampaignAll from '../pages/Campanha/CampaingAll.vue';
import Inicio from '../pages/inicio/Inicio.vue';
import Register from '../components/Register.vue';
import VolunteerDetails from '../pages/Voluntario/VolunteerDetails.vue';
import VolunteerForm from '../pages/Voluntario/VolunteerForm.vue';
import VolunteerList from '../pages/Voluntario/VolunteerList.vue';
import VolunteerProfile from '../pages/Voluntario/VolunteerProfile.vue';
import CampaingAll from '../pages/Campanha/CampaingAll.vue';
import CampaignCreate from '../pages/Campanha/CampaignCreate.vue';
import CreateDonations from '../pages/Donations/CreateDonations.vue';
import QuemSomosList from '../pages/Adm/Site/QuemSomos/QuemSomosList.vue';
import TemasList from '../pages/Adm/Site/Temas/TemasList.vue';
import InicioVolunter from '../pages/inicio/InicioVolunter.vue';

const isAuthenticated = (): boolean => !!localStorage.getItem('usuario');
const isAdmin = (): boolean => {
  const userData = localStorage.getItem('usuario');
  return userData ? JSON.parse(userData).adm : false;
};


const routes = [
  // Rotas públicas
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/campanhas', name: 'Campanhas', component: CampaingAll },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },

  { path: '/campaigns', name: 'CampaignAll', component: CampaignAll },
  // Rotas de perfil do voluntário
  {
    path: '/volunteer/profile',
    name: 'VolunteerProfile',
    component: VolunteerProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/inicio/volunteer',
    name: 'VolunteerInicio',
    component: InicioVolunter,
    // meta: { requiresAuth: true },
  },

  // Rotas do administrador
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    // meta: { requiresAuth: true, requiresAdmin: true },
  },

  { path: '/donations', name: 'DonationReport', component: DonationReport },

  { path: '/dashboard', name: 'AdminDashboard', component: AdminDashboard },

  { path: '/quem-somos', name: 'QuemSomosList', component: QuemSomosList },

  { path: '/temas', name: 'TemasList', component: TemasList },


  // Rotas de campanhas
  // { path: '/campaigns', name: 'CampaignList', component: CampaignList, meta: { requiresAuth: true } },
  { path: '/campaigns/:id', name: 'CampaignDetails', component: CampaignDetails },
  { path: '/campaigns/list', name: 'CampaignList', component: CampaignList},
  { path: '/campaigns/create', name: 'CampaignCreate', component: CampaignCreate },

  // Rotas de voluntários
  { path: '/volunteers', name: 'VolunteerList', component: VolunteerList },
  { path: '/volunteers/:id', name: 'VolunteerDetails', component: VolunteerDetails },
  { path: '/volunteers/form/:id', name: 'VolunteerForm', component: VolunteerForm },

  // Rotas de doações
  { path: '/donations/create', name: 'CreateDonations', component: CreateDonations },

  // Página 404 para rotas não encontradas
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../pages/NotFound.vue') },
];

// Criando o roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Proteção de rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert('Você precisa estar logado para acessar esta página.');
    next({ name: 'Login' });
  } else if (to.meta.requiresAdmin && !isAdmin()) {
    alert('Acesso restrito para administradores.');
    next({ name: 'Inicio' });
  } else {
    next();
  }
});

export default router;
