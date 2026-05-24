import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  LogOut, 
  Menu, 
  Search, 
  Plus, 
  Bell, 
  Settings,
  TrendingUp,
  Users,
  Calendar,
  Edit2,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Dashboard() {
  // Estado para controlar se o menu está aberto (true) ou recolhido (false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Pegamos os dados do admin e a função de sair da nossa "Nuvem"
  const { admin, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* MENU LATERAL (SIDEBAR) */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out z-20 shadow-xl
          ${isSidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="flex items-center gap-3 px-6 py-6 h-20">
          <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center font-bold flex-shrink-0">
            O
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-xl font-bold tracking-tight">Ottolog</h1>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 flex flex-col gap-2 px-3 mt-4">
          <a href="#" className="flex items-center gap-3 px-3 py-3 bg-white/10 text-white rounded-lg transition-colors group">
            <LayoutDashboard size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">Dashboard</span>}
          </a>
          
          <a href="#" className="flex items-center gap-3 px-3 py-3 text-blue-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
            <Briefcase size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">Vagas</span>}
          </a>
        </nav>

        {/* Botão de Logout */}
        <div className="p-3 mb-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-blue-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
            title="Sair do sistema"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">Sair</span>}
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        {/* Cabeçalho Superior (Header) */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Botão de encolher/expandir o menu */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Barra de Busca */}
            <div className="relative hidden md:block w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar vagas, candidatos..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
              <Plus size={18} />
              <span className="hidden sm:block">Criar Vaga</span>
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            <button className="text-gray-500 hover:text-orange-500 transition-colors"><Bell size={20} /></button>
            <button className="text-gray-500 hover:text-orange-500 transition-colors"><Settings size={20} /></button>
            
            {/* Avatar do Usuário */}
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 font-bold ml-2">
              {admin?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Área de Dados (Main) */}
        <main className="p-8 max-w-7xl mx-auto w-full">
          
          <div className="mb-8">
            {/* Nome puxado dinamicamente do Contexto */}
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta, {admin?.name.split(' ')[0]}</h2>
            <p className="text-gray-500 mt-1">Aqui está o resumo do seu pipeline de contratações hoje.</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Briefcase size={24} /></div>
                <span className="text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} /> +12%
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Vagas Ativas</p>
              <h3 className="text-3xl font-bold text-gray-900">24</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
                <span className="text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} /> +5%
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total de Candidatos</p>
              <h3 className="text-3xl font-bold text-gray-900">1.248</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Calendar size={24} /></div>
                <span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">
                  Esta Semana
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Entrevistas Agendadas</p>
              <h3 className="text-3xl font-bold text-gray-900">42</h3>
            </div>
          </div>

          {/* Tabela de Vagas Recentes */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Listagem Recente de Vagas</h3>
              <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">Ver Todas</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Título da Vaga</th>
                    <th className="py-4 px-6 font-semibold">Departamento</th>
                    <th className="py-4 px-6 font-semibold">Local</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-6 font-medium text-gray-900">Engenheiro Fullstack Pleno</td>
                    <td className="py-4 px-6 text-gray-600">Tecnologia</td>
                    <td className="py-4 px-6 text-gray-600">Remoto</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        Ativa
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar"><Edit2 size={16} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Deletar"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-6 font-medium text-gray-900">Analista de Logística</td>
                    <td className="py-4 px-6 text-gray-600">Operações</td>
                    <td className="py-4 px-6 text-gray-600">São Paulo, SP</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                        Fechada
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar"><Edit2 size={16} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Deletar"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}