import { JobRepository } from '../repositories/job.repository.js';

interface CreateJobDTO {
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
  adminId: string;
}

interface UpdateJobDTO extends Partial<CreateJobDTO> {}

export class JobService {
  private jobRepository: JobRepository;

  constructor() {
    this.jobRepository = new JobRepository();
  }

  async executeCreate(data: CreateJobDTO) {
    return this.jobRepository.create(data);
  }

  async executeList(
    filters: { title?: string; department?: string; location?: string },
    page: number = 1,
    limit: number = 10,
    orderBy: string = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc'
  ) {
    // Garantindo que os valores não venham quebrados
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 ? limit : 10;
    
    // Garantindo que a direção seja apenas 'asc' ou 'desc'
    const validOrderDir = ['asc', 'desc'].includes(orderDir) ? orderDir : 'desc';

    // Lista de campos permitidos para ordenação (evita injeção de dados no banco)
    const allowedSortFields = ['createdAt', 'title', 'department', 'status'];
    const validOrderBy = allowedSortFields.includes(orderBy) ? orderBy : 'createdAt';

    return this.jobRepository.findAll(
      filters,
      validPage,
      validLimit,
      validOrderBy,
      validOrderDir as 'asc' | 'desc'
    );
  }

  async executeShow(id: string) {
    const job = await this.jobRepository.findById(id);

    if (!job) {
      throw new Error('Vaga não encontrada.');
    }

    return job;
  }

  async executeUpdate(id: string, data: UpdateJobDTO) {
    const jobExists = await this.jobRepository.findById(id);

    if (!jobExists) {
      throw new Error('Vaga não encontrada.');
    }

    return this.jobRepository.update(id, data);
  }

  async executeDelete(id: string) {
    const jobExists = await this.jobRepository.findById(id);

    if (!jobExists) {
      throw new Error('Vaga não encontrada.');
    }

    await this.jobRepository.delete(id);
  }

  async executeMetrics() {
    return this.jobRepository.getMetrics();
  }
}