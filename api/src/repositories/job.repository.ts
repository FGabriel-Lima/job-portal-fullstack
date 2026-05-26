import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';

export class JobRepository {
  async create(data: Prisma.JobUncheckedCreateInput) {
    return prisma.job.create({
      data,
    });
  }

  async findAll(
    filters: { title?: string; department?: string; location?: string },
    page: number,
    limit: number,
    orderBy: string,
    orderDir: 'asc' | 'desc'
  ) {
    // Calculando quantos itens pular baseado na página atual
    const skip = (page - 1) * limit;

    // Montando as regras de filtro para reutilizar
    const whereClause: Prisma.JobWhereInput = {
      title: filters.title ? { contains: filters.title, mode: 'insensitive' } : undefined,
      department: filters.department ? { contains: filters.department, mode: 'insensitive' } : undefined,
      location: filters.location ? { contains: filters.location, mode: 'insensitive' } : undefined,
    };

    // Disparando as duas buscas simultaneamente para maior performance
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          [orderBy]: orderDir, // Ex: { createdAt: 'desc' } ou { title: 'asc' }
        },
      }),
      prisma.job.count({ where: whereClause }), // Conta o total de vagas que batem com o filtro
    ]);

    // Retorna os dados envelopados com as informações da paginação (meta)
    return {
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return prisma.job.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.JobUpdateInput) {
    return prisma.job.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.job.delete({
      where: { id },
    });
  }

  async getMetrics() {
    const total = await prisma.job.count();
    const abertas = await prisma.job.count({ where: { status: 'Aberta' } });
    const encerradas = await prisma.job.count({ where: { status: 'Encerrada' } });

    return { total, abertas, encerradas };
  }
}