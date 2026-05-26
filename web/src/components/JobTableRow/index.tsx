import { Edit2, Trash2 } from 'lucide-react';
import { type Job } from '../../hooks/useDashboard';

interface JobTableRowProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export function JobTableRow({ job, onEdit, onDelete }: JobTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-6 font-medium text-gray-900">{job.title}</td>
      <td className="py-4 px-6 text-gray-600">{job.department}</td>
      <td className="py-4 px-6 text-gray-600">{job.location}</td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
          job.status === 'Aberta' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {job.status}
        </span>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(job)} 
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" 
            title="Editar"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(job.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
            title="Deletar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}