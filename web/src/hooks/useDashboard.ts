import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  process: string;
  applyLink: string;
  status: string;
}

interface DashboardMetrics {
  total: number;
  abertas: number;
  encerradas: number;
}

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({ total: 0, abertas: 0, encerradas: 0 });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      if (refreshTrigger > 0) {
        setLoading(true);
      }

      try {
        const [metricsResponse, jobsResponse] = await Promise.all([
          api.get('/jobs/dashboard/metrics'),
          api.get('/jobs?limit=5')
        ]);

        setMetrics(metricsResponse.data);
        setJobs(jobsResponse.data.data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [refreshTrigger]); 

  function refreshData() {
    setRefreshTrigger(prev => prev + 1);
  }

  return {
    metrics,
    jobs,
    loading,
    refreshData 
  };
}