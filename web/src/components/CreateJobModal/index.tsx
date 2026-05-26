import { useState, type FormEvent } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import { isAxiosError } from 'axios';
import { type Job } from '../../hooks/useDashboard'; 
import { toast } from 'sonner';

interface CreateJobModalProps {
  onClose: () => void;
  onSuccess: () => void;
  jobToEdit?: Job | null; 
}

export function CreateJobModal({ onClose, onSuccess, jobToEdit }: CreateJobModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: jobToEdit?.title || '',
    department: jobToEdit?.department || '',
    location: jobToEdit?.location || '',
    type: jobToEdit?.type || '',
    salary: jobToEdit?.salary || '',
    status: jobToEdit?.status || 'Aberta',
    applyLink: jobToEdit?.applyLink || '',
    description: jobToEdit?.description || '',
    requirements: jobToEdit?.requirements || '',
    benefits: jobToEdit?.benefits || '',
    process: jobToEdit?.process || ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (jobToEdit) {
        await api.put(`/jobs/${jobToEdit.id}`, formData);
        toast.success('Vaga atualizada com sucesso!');
      } else {
        await api.post('/jobs', formData);
        toast.success('Vaga publicada com sucesso!');
      }
      
      onSuccess(); 
      onClose(); 
    } catch (err) {
      if (isAxiosError(err) && err.response?.data?.error) {
        toast.error(err.response.data.error); 
      } else {
        toast.error('Erro ao salvar a vaga. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Cabeçalho Fixo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-gray-900">Criar Nova Vaga</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        {/* Corpo Rolável */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <form id="createJobForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Título da Vaga</label>
                <input required type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Desenvolvedor Front-end Senior" className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-1">Departamento</label>
                <input required type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Ex: Tecnologia / Engenharia" className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Localidade</label>
                <input required type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: São Paulo, SP (Híbrido)" className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Contratação</label>
                <select required id="type" name="type" value={formData.type} onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all">
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-1">Faixa Salarial</label>
                <input required type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="Ex: R$ 8.000 - R$ 12.000" className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">Status Inicial</label>
                <select required id="status" name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all">
                  <option value="Aberta">Aberta</option>
                  <option value="Encerrada">Encerrada</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="applyLink" className="block text-sm font-semibold text-gray-700 mb-1">Link para Candidatura</label>
              <input required type="url" id="applyLink" name="applyLink" value={formData.applyLink} onChange={handleChange} placeholder="https://forms.gle/..." className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-12 px-4 outline-none transition-all" />
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Descrição da Vaga</label>
              <textarea required id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Descreva o propósito da vaga..." rows={3} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-4 outline-none transition-all resize-y"></textarea>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700 mb-1">Requisitos</label>
              <textarea required id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Habilidades técnicas e comportamentais..." rows={3} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-4 outline-none transition-all resize-y"></textarea>
            </div>

            <div>
              <label htmlFor="benefits" className="block text-sm font-semibold text-gray-700 mb-1">Benefícios</label>
              <textarea required id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} placeholder="Plano de saúde, VR, VA..." rows={2} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-4 outline-none transition-all resize-y"></textarea>
            </div>

            <div>
              <label htmlFor="process" className="block text-sm font-semibold text-gray-700 mb-1">Processo Seletivo</label>
              <textarea required id="process" name="process" value={formData.process} onChange={handleChange} placeholder="Ex: 1. Triagem, 2. Entrevista..." rows={2} className="w-full rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-4 outline-none transition-all resize-y"></textarea>
            </div>

          </form>
        </div>

        {/* Rodapé Fixo */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 font-bold transition-colors disabled:opacity-50">
            Cancelar
          </button>
          
          <button type="submit" form="createJobForm" disabled={loading} className="px-6 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm">
            {loading ? 'Salvando...' : (
              <>
                <CheckCircle size={20} />
                Publicar Vaga
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}