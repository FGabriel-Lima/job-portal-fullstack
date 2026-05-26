import { Search, Building, MapPin } from 'lucide-react';
import { PublicHeader } from '../../components/PublicHeader';
import { PublicFooter } from '../../components/PublicFooter';
import { JobCard } from '../../components/JobCard';
import { useHome } from '../../hooks/useHome';

export function Home() {
  const {
    searchTitle, setSearchTitle,
    searchDepartment, setSearchDepartment,
    searchLocation, setSearchLocation,
    sortBy, setSortBy,          
    page, setPage, totalPages,  
    jobs, loading, handleSearch
  } = useHome();

  return (
    <div className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col font-sans">
      
      {/* HEADER */}
      <PublicHeader />

      <main className="flex-grow">
        
        {/* HERO SECTION E FILTROS */}
        <section className="relative bg-blue-900 pt-24 pb-32 md:pb-40 border-b border-gray-200">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Junte-se ao time Ottolog</h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Inovando o futuro da logística com tecnologia de ponta. Descubra oportunidades para moldar a próxima geração de soluções corporativas.
            </p>
          </div>

          {/* BARRA DE PESQUISA */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 w-full max-w-4xl px-6 z-20">
            {/* items-stretch para o botão acompanhar a altura dos inputs */}
            <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-stretch gap-4 border border-gray-200">
              
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar por cargo..." 
                  className="w-full h-full min-h-[48px] pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Departamento" 
                  className="w-full h-full min-h-[48px] pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  value={searchDepartment}
                  onChange={(e) => setSearchDepartment(e.target.value)}
                />
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Localidade" 
                  className="w-full h-full min-h-[48px] pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="bg-orange-500 text-white rounded-lg font-bold px-8 hover:bg-orange-600 transition-all shadow-sm flex items-center justify-center disabled:opacity-70 min-h-[48px] md:w-auto"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </form>
          </div>
        </section>

        {/* LISTAGEM DE VAGAS E ORDENAÇÃO */}
        <section className="max-w-4xl mx-auto px-6 py-24 mt-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {jobs.length > 0 ? 'Vagas Abertas' : 'Nenhuma vaga encontrada'}
            </h2>
            
            {/* Seletor de Ordenação */}
            {jobs.length > 0 && (
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block px-4 py-2 outline-none shadow-sm cursor-pointer"
              >
                <option value="recentes">Mais recentes</option>
                <option value="titulo">Ordem Alfabética</option>
                <option value="departamento">Por Departamento</option>
                <option value="status">Por Status da Vaga</option>
              </select>
            )}
          </div>

          {/* Cards das Vagas */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-gray-500 text-center py-8">Carregando oportunidades...</p>
            ) : (
              jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>

          {/* Controles de Paginação */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button 
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Anterior
              </button>
              
              <span className="text-sm font-medium text-gray-500">
                Página {page} de {totalPages}
              </span>
              
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Próxima
              </button>
            </div>
          )}

        </section>
      </main>

      {/* FOOTER */}
      <PublicFooter />
    </div>
  );
}