import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({ onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-start gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Excluir Vaga</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita e todos os dados serão removidos permanentemente.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            Sim, excluir vaga
          </button>
        </div>

      </div>
    </div>
  );
}