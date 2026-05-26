import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { Home } from '../pages/Home';
import { JobDetails } from '../pages/JobDetails';

export function Router() {
  return (
    <Routes>
      {/* Rotas Públicas (Qualquer um acessa) */}
      <Route path="/" element={<Home />} />
      <Route path="/vagas/:id" element={<JobDetails />} />
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