import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../services/api';
import { type Job } from './useDashboard';

export function useHome() {
  // Filtros de busca
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Paginação e Ordenação
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('recentes');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        let orderBy = 'createdAt';
        let orderDir = 'desc';

        if (sortBy === 'titulo') {
          orderBy = 'title';
          orderDir = 'asc';
        } else if (sortBy === 'departamento') {
          orderBy = 'department';
          orderDir = 'asc';
        } else if (sortBy === 'status') {
          orderBy = 'status';
          orderDir = 'asc';
        }

        // Montando a URL completa com paginação, ordenação e filtros (limitado a 5 por página)
        const params = { page, limit: 5, orderBy, orderDir, title: searchTitle || undefined, department: searchDepartment || undefined, location: searchLocation || undefined };
        const response = await api.get('/jobs', { params });
        
        // Puxando os dados e os metadados da paginação
        setJobs(response.data.data);
        setTotalPages(response.data.meta.totalPages || 1);
        setTotal(response.data.meta.total || 0);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [trigger, page, sortBy]); // Recarrega sempre que mudar a página, a ordenação ou disparar o gatilho

  function handleSearch(e?: FormEvent) {
    if (e) e.preventDefault();
    setPage(1);
    setTrigger(prev => prev + 1);
  }

  return {
    searchTitle, setSearchTitle,
    searchDepartment, setSearchDepartment,
    searchLocation, setSearchLocation,
    sortBy, setSortBy,
    page, setPage, totalPages,
    jobs, total, loading, handleSearch
  };
}