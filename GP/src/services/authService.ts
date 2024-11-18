// /services/authService.ts
import { ref } from 'vue';

export const userType = ref<string | null>(null);

export const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'admin'); 
      localStorage.setItem('userId', '1');  // Exemplo de ID para admin
      userType.value = 'admin';
      return true;
    }
    if (username === 'user@gmail.com' && password === 'userpass') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'volunteer'); 
      localStorage.setItem('userId', '1');  // Exemplo de ID para voluntário
      userType.value = 'volunteer';
      return true;
    }
    else {
      userType.value = 'user';
      return false;
    }
};

export const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const isAdmin = (): boolean => {
  return localStorage.getItem('role') === 'admin';
};

export const isVolunteer = (): boolean => {
  return localStorage.getItem('role') === 'volunteer';
};

// Função para obter o ID do usuário
export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};
