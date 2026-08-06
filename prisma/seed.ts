import 'dotenv/config'; // 确保在独立运行脚本时能读取到 .env 里的 DATABASE_URL
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../src/generated/prisma';

// 1. 初始化数据库连接池
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. 将连接池通过适配器传给 Prisma
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 开始播种数据库 (Seeding database)...');

  // 1. 播种 Admin (系统管理员)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@hawaii.edu' },
    update: {},
    create: {
      email: 'admin@hawaii.edu',
      name: 'adminpassword', // Password
      role: Role.ADMIN, // 赋予最高管理员权限
    },
  });
  console.log(`✅ 成功创建测试用户 (Test User Successfully Created): ${adminUser.email} (Role: ${adminUser.role})`);

  // 2. 播种 Officer (社团干部)
  const officerUser = await prisma.user.upsert({
    where: { email: 'officer@hawaii.edu' },
    update: {},
    create: {
      email: 'officer@hawaii.edu',
      name: 'officerpassword', // Password
      role: Role.OFFICER, // 赋予社团干部权限
    },
  });
  console.log(`✅ 成功创建测试用户 (Test User Successfully Created): ${officerUser.email} (Role: ${officerUser.role})`);

  // 3. 播种 Student (普通学生)
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@hawaii.edu' },
    update: {},
    create: {
      email: 'student@hawaii.edu',
      name: 'studentpassword', // Password
      role: Role.STUDENT, // 赋予普通学生权限
    },
  });
  console.log(`✅ 成功创建测试用户 (Test User Successfully Created): ${studentUser.email} (Role: ${studentUser.role})`);

  console.log('🎉 播种完成！(Sowing Completed!)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ 播种失败 (Seeding Failure):', e);
    await prisma.$disconnect();
    process.exit(1);
  });