import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma';

// 1. 初始化数据库连接池
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. 注入适配器
const adapter = new PrismaPg(pool);

// 3. 在开发环境下防止热重载产生过多的数据库连接
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;