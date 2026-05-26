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
  const [sortBy, setSortBy] = useState('recentes'); // 'recentes' ou 'titulo'

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        // Traduzindo a escolha do Front para o Back
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
        let url = `/jobs?page=${page}&limit=5&orderBy=${orderBy}&orderDir=${orderDir}&`;
        if (searchTitle) url += `title=${searchTitle}&`;
        if (searchDepartment) url += `department=${searchDepartment}&`;
        if (searchLocation) url += `location=${searchLocation}&`;

        const response = await api.get(url);
        
        // Puxando os dados e os metadados da paginação
        setJobs(response.data.data);
        setTotalPages(response.data.meta.totalPages || 1);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [trigger, page, sortBy]); // Recarrega sempre que mudar a página, a ordenação ou disparar o gatilho

  // Função chamada ao clicar em "Buscar" no formulário
  function handleSearch(e?: FormEvent) {
    if (e) e.preventDefault();
    setPage(1); // Sempre volta para a página 1 ao fazer uma nova pesquisa
    setTrigger(prev => prev + 1);
  }

  return {
    searchTitle, setSearchTitle,
    searchDepartment, setSearchDepartment,
    searchLocation, setSearchLocation,
    sortBy, setSortBy,
    page, setPage, totalPages,
    jobs, loading, handleSearch
  };
}