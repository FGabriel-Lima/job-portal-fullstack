import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  )
}