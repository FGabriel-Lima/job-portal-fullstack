import { Search, Building, MapPin } from 'lucide-react';
import { PublicHeader } from '../../components/PublicHeader';
import { PublicFooter } from '../../components/PublicFooter';
import { JobCard } from '../../components/JobCard';
import { useHome } from '../../hooks/useHome';

// Traçado de rota de entrega cruzando o topo, com pinos nas cidades onde há vagas.
function RouteLine() {
  const stops = [
    { x: 150, y: 290, label: 'Quixadá' },
    { x: 270, y: 110, label: 'Fortaleza' },
    { x: 1060, y: 210, label: 'Remoto' },
  ];
  return (
    <svg
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {[
        'M-20 340 C 60 330, 110 310, 150 290 S 240 160, 270 110 S 310 20, 330 -20',
        'M1230 30 C 1160 70, 1100 140, 1060 210 S 990 320, 960 400',
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke="#fb923c" strokeOpacity="0.45" strokeWidth="2.5" strokeDasharray="10 10" />
      ))}
      {stops.map((s) => (
        <g key={s.label} transform={`translate(${s.x} ${s.y})`}>
          <circle r="16" fill="#fb923c" fillOpacity="0.15" />
          <circle r="6" fill="#fb923c" />
          <text y="-24" textAnchor="middle" fill="#bfdbfe" fillOpacity="0.7" fontSize="13" fontWeight="600" fontFamily="Barlow, sans-serif" letterSpacing="2">
            {s.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Home() {
  const {
    searchTitle, setSearchTitle,
    searchDepartment, setSearchDepartment,
    searchLocation, setSearchLocation,
    sortBy, setSortBy,          
    page, setPage, totalPages,  
    jobs, total, loading, handleSearch
  } = useHome();

  return (
    <div className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col font-sans">
      
      {/* HEADER */}
      <PublicHeader />

      <main className="flex-grow">
        
        {/* HERO SECTION E FILTROS */}
        <section className="relative bg-blue-900 pt-16 pb-10 md:pt-20 md:pb-40">
          <div className="absolute inset-0 hidden overflow-hidden md:block">
            <RouteLine />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Trabalhe conosco</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-white tracking-tight">Junte-se ao time Ottolog</h1>
            <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
              Somos uma transportadora do Ceará que usa tecnologia para entregar no prazo. Temos vagas em operações,
              tecnologia e administrativo, presenciais e remotas.
            </p>
            {total > 0 && (
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                {total} {total === 1 ? 'vaga publicada' : 'vagas publicadas'}
              </p>
            )}
          </div>

          {/* BARRA DE PESQUISA */}
          <div className="relative z-20 mx-auto mt-10 w-full max-w-4xl px-6 md:absolute md:left-1/2 md:-bottom-16 md:mt-0 md:-translate-x-1/2">
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
            <h2 className="font-display text-3xl font-bold text-gray-900">
              {!loading && jobs.length === 0 ? 'Nenhuma vaga com esses filtros' : 'Vagas'}
            </h2>

            <label className="flex items-center gap-2 text-sm text-gray-500">
              Ordenar por
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 px-3 py-2 outline-none shadow-sm cursor-pointer"
              >
                <option value="recentes">Mais recentes</option>
                <option value="titulo">Ordem alfabética</option>
                <option value="departamento">Departamento</option>
                <option value="status">Status da vaga</option>
              </select>
            </label>
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