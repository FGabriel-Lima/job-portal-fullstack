import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Pega a URL do banco do nosso .env
const connectionString = `${process.env.DATABASE_URL}`;

// Cria o pool de conexões nativo do PostgreSQL
const pool = new Pool({ connectionString });

// Injeta o pool no adaptador do Prisma
const adapter = new PrismaPg(pool);

// Instancia e exporta o PrismaClient que vamos usar em toda a API
export const prisma = new PrismaClient({ adapter });