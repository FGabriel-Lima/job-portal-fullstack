import { Request, Response } from 'express';
import { JobService } from '../services/job.service.js';

interface AuthRequest extends Request {
  adminId?: string;
}

export class JobController {
  
  async create(req: AuthRequest, res: Response) {
    try {
      const adminId = req.adminId;

      if (!adminId) {
        return res.status(401).json({ error: 'Não autorizado.' });
      }

      const jobService = new JobService();
      
      const job = await jobService.executeCreate({
        ...req.body,
        adminId
      });

      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar a vaga.' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      // Extraindo tudo que pode vir na URL (?title=Dev&page=2&limit=5&orderBy=title&orderDir=asc)
      const { title, department, location, page, limit, orderBy, orderDir } = req.query;
      
      const jobService = new JobService();
      
      const result = await jobService.executeList(
        {
          title: title ? String(title) : undefined,
          department: department ? String(department) : undefined,
          location: location ? String(location) : undefined,
        },
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
        orderBy ? String(orderBy) : undefined,
        orderDir ? String(orderDir) as 'asc' | 'desc' : undefined
      );

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar as vagas.' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      
      const jobService = new JobService();
      const job = await jobService.executeShow(id);

      return res.json(job);
    } catch (error: any) {
      if (error.message === 'Vaga não encontrada.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao buscar a vaga.' });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const data = req.body;

      const jobService = new JobService();
      const updatedJob = await jobService.executeUpdate(id, data);

      return res.json(updatedJob);
    } catch (error: any) {
      if (error.message === 'Vaga não encontrada.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao atualizar a vaga.' });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const jobService = new JobService();
      await jobService.executeDelete(id);

      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Vaga não encontrada.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao excluir a vaga.' });
    }
  }

  async dashboardMetrics(req: Request, res: Response) {
    try {
      const jobService = new JobService();
      const metrics = await jobService.executeMetrics();

      return res.json(metrics);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar métricas.' });
    }
  }
}