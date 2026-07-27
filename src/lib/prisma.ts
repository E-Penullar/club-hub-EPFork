// 注意这里的导入路径要与 schema.prisma 中的自定义 output 一致
import { PrismaClient } from '../generated/prisma'; 

const prismaClientSingleton = () => {
  return new PrismaClient();
};


declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;