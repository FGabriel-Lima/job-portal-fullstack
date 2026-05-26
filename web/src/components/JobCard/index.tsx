import { Link } from 'react-router-dom';
import { Building, MapPin, Briefcase } from 'lucide-react';
import { type Job } from '../../hooks/useDashboard'; // Reaproveitando a tipagem da vaga!

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-orange-500 transition-all duration-300 group flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{job.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
            job.status === 'Aberta' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'
          }`}>
            {job.status}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            <MapPin size={16} />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            <Building size={16} />
            {job.department}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            <Briefcase size={16} />
            {job.type}
          </div>
        </div>
      </div>

      <Link 
        to={`/vagas/${job.id}`}
        className="bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-bold text-sm px-6 py-2.5 hover:border-orange-500 hover:text-orange-500 transition-colors whitespace-nowrap w-full md:w-auto text-center"
      >
        Ver detalhes
      </Link>

    </div>
  );
}