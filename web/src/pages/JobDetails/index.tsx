import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Briefcase } from 'lucide-react';
import { PublicHeader } from '../../components/PublicHeader';
import { PublicFooter } from '../../components/PublicFooter';
import { useJobDetails } from '../../hooks/useJobDetails';

export function JobDetails() {
  const { job, loading } = useJobDetails();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Carregando detalhes da vaga...</p>
      </div>
    );
  }

  if (!job) return null;
  
  return (
    <div className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* Cabeçalho da Vaga */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm mb-6">
            <ArrowLeft size={18} />
            Voltar para vagas
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-6 font-medium text-gray-600 text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={18} /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Building size={18} /> {job.department}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={18} /> {job.type}</span>
              </div>
            </div>
            
            <div>
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                job.status === 'Aberta' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
              }`}>
                {job.status}
              </span>
            </div>
          </div>
        </div>

        {/* Layout de Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Coluna Esquerda: Detalhes em Texto */}
          <div className="lg:col-span-2 space-y-12">
            
            {job.description && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Descrição da Vaga</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </section>
            )}

            {job.requirements && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Requisitos e Qualificações</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </section>
            )}

            {job.benefits && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Benefícios</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.benefits}</p>
              </section>
            )}

            {job.process && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">Processo Seletivo</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.process}</p>
              </section>
            )}

          </div>

          {/* Coluna Direita: Card Fixo (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-28">
              <h3 className="text-lg font-bold mb-6 text-gray-900">Resumo da Vaga</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Faixa Salarial</span>
                  <span className="text-lg font-medium text-gray-900">{job.salary}</span>
                </div>
              </div>

              <button 
                onClick={() => window.open(job.applyLink, '_blank')}
                className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors shadow-sm mb-3"
              >
                Candidatar-se agora
              </button>
              
              <p className="text-xs text-center text-gray-400 font-medium">Você será redirecionado para o formulário externo.</p>
            </div>
          </div>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}