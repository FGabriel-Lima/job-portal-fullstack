import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRegister } from '../../hooks/useRegister';

export function Register() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error,
    loading,
    handleRegister
  } = useRegister();

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased h-screen w-full overflow-hidden">
      <div className="flex h-full w-full">
        
        <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative flex-col justify-center items-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md text-center">
            <img src={logoImg} alt="Ottolog Express" className="w-auto h-28 mb-8 object-contain drop-shadow-xl brightness-0 invert" />
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Eleve suas operações logísticas
            </h1>
            <p className="text-lg text-blue-200">
              Junte-se à plataforma Ottolog para gerenciar recursos, verificar desempenho e impulsionar o sucesso organizacional.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative h-full overflow-y-auto">
          
          <div className="lg:hidden flex flex-col items-center mb-10">
            <img src={logoImg} alt="Ottolog Express" className="w-auto h-16 mb-4 object-contain" />
          </div>

          <div className="w-full max-w-[420px] flex flex-col">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-blue-900 mb-2 tracking-tight">Criar Conta Administrativa</h2>
              <p className="text-gray-500">Insira seus dados para criar um novo acesso.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              
              <Input 
                label="Nome Completo"
                id="fullName"
                type="text"
                placeholder="Seu nome completo"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input 
                label="E-mail Corporativo"
                id="email"
                type="email"
                placeholder="nome@empresa.com.br"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                label="Senha"
                id="password"
                type="password"
                placeholder="Mínimo de 6 caracteres"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input 
                label="Confirmar Senha"
                id="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button type="submit" isLoading={loading}>
                Criar Conta
              </Button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Já possui uma conta? <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 transition-colors duration-200 focus:outline-none focus:underline">Faça login.</Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}