// Novas importações no topo do Login/index.tsx
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import logoImg from '../../assets/logo.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts//AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('Erro de conexão com o servidor.');
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased h-screen w-full overflow-hidden">
      <div className="flex h-full w-full">
        
        {/* Painel Esquerdo: Branding / Azul Escuro */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative flex-col justify-center items-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md text-center">
            <img src={logoImg} alt="Ottolog Express" className="w-auto h-28 mb-8 object-contain drop-shadow-xl brightness-0 invert" />
            <p className="text-lg text-blue-200">
              Sistema de gestão administrativa e logística de recursos corporativos.
            </p>
          </div>
        </div>

        {/* Painel Direito: Formulário de Login */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative h-full overflow-y-auto">
          
          <div className="lg:hidden flex flex-col items-center mb-10">
            <img src={logoImg} alt="Ottolog Express" className="w-auto h-16 mb-4 object-contain" />
          </div>

          <div className="w-full max-w-[400px] flex flex-col">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-blue-900 mb-2 tracking-tight">Acesso ao Painel</h2>
              <p className="text-gray-500">Por favor, insira suas credenciais abaixo.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              
              <Input 
                label="Endereço de E-mail"
                id="email"
                type="email"
                placeholder="nome@empresa.com.br"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                {/* Link de esqueceu a senha posicionado sobre o Input */}
                <div className="absolute right-0 top-0 z-10">
                  <a className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200 focus:outline-none focus:underline" href="#">
                    Esqueceu a senha?
                  </a>
                </div>
                
                <Input 
                  label="Senha"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={
                    <button 
                      aria-label="Alternar visibilidade da senha" 
                      className="text-xs font-semibold text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200" 
                      onClick={() => setShowPassword(!showPassword)} 
                      type="button"
                    >
                      {showPassword ? 'OCULTAR' : 'MOSTRAR'}
                    </button>
                  }
                />
              </div>

              <Button type="submit" isLoading={!!loading}>
                Entrar
              </Button>

            </form>

            <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
              Precisa de uma conta? <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 transition-colors duration-200 focus:outline-none focus:underline">Solicitar acesso.</Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}