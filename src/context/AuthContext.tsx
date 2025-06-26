import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      const tokenSalvo = localStorage.getItem('token');
      if (tokenSalvo) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${tokenSalvo}`;
          const res = await api.get('/usuario/perfil');
          setUsuario(res.data);
          setToken(tokenSalvo);
        } catch (error) {
          console.error('Erro ao carregar perfil', error);
          logout();
        }
      }
      setCarregando(false);
    };

    carregarUsuario();
  }, []);

  const login = async (email: string, senha: string) => {
    const res = await api.post('/auth/login', { email, senha });
    const { usuario: usuarioLogado, token: novoToken } = res.data;
    
    localStorage.setItem('token', novoToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`;
    
    setUsuario(usuarioLogado);
    setToken(novoToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};