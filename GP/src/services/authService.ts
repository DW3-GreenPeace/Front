import { reactive, provide } from 'vue';
import { useRouter } from 'vue-router';

const authState = reactive({
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
    } else {
      authState.user = null;
      authState.role = null;
    }
    authState.loading = false;
  };

  checkAuth();

  provide('auth', authState);
}
