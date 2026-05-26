import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { type Job } from '../../hooks/useDashboard';

export function useDashboardController() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Estados dos Dados
  const [metrics, setMetrics] = useState({ total: 0, abertas: 0, encerradas: 0 });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { admin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Monta a URL de vagas com paginação (5 por página) e filtro de busca
        let jobsUrl = `/jobs?page=${page}&limit=5&orderBy=createdAt&orderDir=desc&`;
        if (searchTitle) jobsUrl += `title=${searchTitle}&`;

        const [metricsResponse, jobsResponse] = await Promise.all([
          api.get('/jobs/dashboard/metrics'),
          api.get(jobsUrl)
        ]);

        setMetrics(metricsResponse.data);
        setJobs(jobsResponse.data.data);
        setTotalPages(jobsResponse.data.meta.totalPages || 1);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [refreshTrigger, page]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setRefreshTrigger(prev => prev + 1);
  }

  function refreshData() {
    setRefreshTrigger(prev => prev + 1);
  }

  function toggleSidebar() { setIsSidebarOpen(prev => !prev); }
  function handleCreateNewJob() { setEditingJob(null); setIsModalOpen(true); }
  function handleEditJob(job: Job) { setEditingJob(job); setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); }

  function handleDeleteJob(id: string) {
    setJobToDelete(id);
  }

  // Quando clica em "Cancelar" no modal
  function cancelDelete() {
    setJobToDelete(null);
  }

  // Quando clica em "Sim, excluir" no modal
  async function confirmDelete() {
    if (!jobToDelete) return;

    try {
      await api.delete(`/jobs/${jobToDelete}`);
      refreshData();
      toast.success('Vaga excluída com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir a vaga. Tente novamente.');
    } finally {
      setJobToDelete(null);
    }
  }

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  return {
    isSidebarOpen, toggleSidebar, isModalOpen, closeModal,
    admin, metrics, jobs, loading, editingJob, refreshData,
    searchTitle, setSearchTitle, page, setPage, totalPages, handleSearch,
    handleCreateNewJob, handleEditJob, handleDeleteJob, handleLogout, jobToDelete, cancelDelete, confirmDelete
  };
}