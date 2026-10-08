import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../services/api';
import { type Job } from './useDashboard';

export function useJobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da vaga:', error);
        toast.error('Essa vaga não existe mais. Veja as outras vagas abertas.');
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchJob();
    }
  }, [id, navigate]);

  return { job, loading };
}