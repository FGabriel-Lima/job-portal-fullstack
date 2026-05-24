/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  admin: Admin | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const storagedAdmin = localStorage.getItem('@Ottolog:admin');
    return storagedAdmin ? JSON.parse(storagedAdmin) : null;
  });

  useEffect(() => {
    const storagedToken = localStorage.getItem('@Ottolog:token');
    if (storagedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { token, admin: adminData } = response.data;

    localStorage.setItem('@Ottolog:token', token);
    localStorage.setItem('@Ottolog:admin', JSON.stringify(adminData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setAdmin(adminData);
  }

  function signOut() {
    localStorage.removeItem('@Ottolog:token');
    localStorage.removeItem('@Ottolog:admin');
    delete api.defaults.headers.common['Authorization'];
    
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}