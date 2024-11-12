// /services/authService.ts
import { ref } from 'vue';

export const userType = ref<string | null>(null);

export const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'admin');  // Armazenando a função do usuário
      userType.value = 'admin';
      return true;
    }
    if (username === 'user' && password === 'userpass') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'user');  // Definindo um usuário regular
      userType.value = 'volunteer';
      return true;
    }
    else{
      userType.value = 'user';
      return false;
    }
    
  };
  
  export const logout = (): void => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  };
  
  export const isAuthenticated = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };
  
  export const isAdmin = (): boolean => {
    return localStorage.getItem('role') === 'admin';  // Verificando se o usuário tem o papel de 'admin'
  };

  export const isVolunter = (): boolean => {
    return localStorage.getItem('role') === 'volunteer';  // Verificando se o usuário tem o papel de 'admin'
  };
  