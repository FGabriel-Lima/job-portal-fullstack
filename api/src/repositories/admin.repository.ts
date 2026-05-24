import { prisma } from '../config/prisma.js';
import { Prisma } from '@prisma/client';

export const AdminRepository = {
  async findByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  },

  async create(data: Prisma.AdminCreateInput) {
    return prisma.admin.create({
      data,
    });
  },
};