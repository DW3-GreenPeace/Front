import { reactive, provide } from 'vue';
import { useRouter } from 'vue-router';

const authState = reactive({
  id: '',
  user: null,
  loading: true,
  role: null,
});

export function useAuth() {
  return authState;
}

export function setupAuthProvider() {
  const router = useRouter();

  const checkAuth = () => {
    const userString = localStorage.getItem('usuario');
    if (userString) {
      const user = JSON.parse(userString);
      authState.user = user;
      authState.role = user.role || 'usuario';
      authState.id = user.id || '';  // Atribuindo o id do usuário do localStorage
    } else {
      authState.user = null;
      authState.role = null;
      authState.id = '';  // Garantindo que o id seja limpo caso não haja usuário
    }
    authState.loading = false;
  };

  checkAuth();

  provide('auth', authState);
}
