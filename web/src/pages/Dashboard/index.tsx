import { LayoutDashboard, LogOut, Menu, Search, Plus, FolderOpen, CheckCircle, XCircle } from 'lucide-react';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { MetricCard } from '../../components/MetricCard';
import { CreateJobModal } from '../../components/CreateJobModal';
import { JobTableRow } from '../../components/JobTableRow';
import { useDashboardController } from './useDashboardController';

export function Dashboard() {
  const {
    isSidebarOpen, toggleSidebar, isModalOpen, closeModal,
    admin, metrics, jobs, loading, editingJob, refreshData,
    searchTitle, setSearchTitle, page, setPage, totalPages, handleSearch,
    handleCreateNewJob, handleEditJob, handleDeleteJob, handleLogout,
    jobToDelete, cancelDelete, confirmDelete
  } = useDashboardController();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <aside className={`fixed left-0 top-0 h-full bg-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out z-20 shadow-xl ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center gap-3 px-6 py-6 h-20">
          <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center font-bold flex-shrink-0">O</div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-xl font-bold tracking-tight">Ottolog</h1>
              <p className="text-blue-300 text-xs">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-3 mt-4">
          <button className="w-full flex items-center gap-3 px-3 py-3 bg-white/10 text-white rounded-lg transition-colors">
            <LayoutDashboard size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">Dashboard</span>}
          </button>
        </nav>

        <div className="p-3 mb-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 text-blue-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors" title="Sair do sistema">
            <LogOut size={20} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">Sair</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* CABEÇALHO */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <button onClick={toggleSidebar} className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors mr-2">
              <Menu size={24} />
            </button>

            {/* BARRA DE PESQUISA FUNCIONAL */}
            <form onSubmit={handleSearch} className="relative hidden md:block w-full max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar vagas por título..." 
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-all" 
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleCreateNewJob}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:block">Criar Vaga</span>
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            {/* Ícones de Bell e Settings removidos */}
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 font-bold uppercase">
              {admin?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo, {admin?.name.split(' ')[0]}</h2>
            <p className="text-gray-500 mt-1">Aqui está o resumo geral das vagas da empresa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Total de Vagas Cadastradas" value={metrics.total} icon={FolderOpen} colorTheme="gray" subtitle="Geral" />
            <MetricCard title="Vagas Abertas" value={metrics.abertas} icon={CheckCircle} colorTheme="blue" />
            <MetricCard title="Vagas Encerradas" value={metrics.encerradas} icon={XCircle} colorTheme="orange" />
          </div>

          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Listagem de Vagas</h3>
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
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">Carregando vagas...</td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">Nenhuma vaga encontrada.</td>
                    </tr>
                  ) : (
                    jobs.map(job => (
                      <JobTableRow 
                        key={job.id} 
                        job={job} 
                        onEdit={handleEditJob} 
                        onDelete={handleDeleteJob} 
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* PAGINAÇÃO INCLUÍDA NO RODAPÉ DA TABELA */}
            {!loading && totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setPage(page - 1)} 
                  disabled={page === 1} 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium bg-white disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm text-gray-600 font-medium">Página {page} de {totalPages}</span>
                <button 
                  onClick={() => setPage(page + 1)} 
                  disabled={page === totalPages} 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium bg-white disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </section>
        </main>
      </div>

      {isModalOpen && (
        <CreateJobModal 
          onClose={closeModal} 
          onSuccess={refreshData}
          jobToEdit={editingJob} 
        />
      )}
      {jobToDelete && (
        <ConfirmDeleteModal 
          onClose={cancelDelete} 
          onConfirm={confirmDelete} 
        />
      )}
    </div>
  );
}