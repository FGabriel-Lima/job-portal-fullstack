import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para o login.
  // O "replace" garante que o usuário não consiga usar o botão de "Voltar" do navegador para burlar isso.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver tudo certo, renderiza a tela que ele pediu (ex: Dashboard)
  return children;
}