import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';

export function Router() {
  return (
    <Routes>
      {/* Rota raiz redirecionando para o painel */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Rotas Públicas (Qualquer um acessa) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rotas Privadas (Protegidas pelo Guardião) */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}