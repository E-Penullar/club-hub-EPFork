import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// 注意：这里依然使用你原本的自定义生成路径
import { PrismaClient } from '../generated/prisma'; 

const prismaClientSingleton = () => {
  // 从 .env 文件获取数据库连接字符串
  const connectionString = process.env.DATABASE_URL;
  
  // 初始化 PG 连接池
  const pool = new Pool({ connectionString });
  
  // 将连接池包装成 Prisma 适配器
  const adapter = new PrismaPg(pool);
  
  // 实例化 Prisma Client 并传入适配器
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;