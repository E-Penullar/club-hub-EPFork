import 'dotenv/config'; // 确保在独立运行脚本时能读取到 .env 里的 DATABASE_URL
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, ClubStatus } from '../src/generated/prisma';

// 1. 初始化数据库连接池
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. 将连接池通过适配器传给 Prisma
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 开始播种数据库 (Seeding database)...');

  // ==========================================
  // 1. 播种测试用户账户 (保持你原有的逻辑)
  // ==========================================
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });
  console.log(`✅ 成功创建测试用户: ${adminUser.email} (Role: ${adminUser.role})`);

  const officerUser = await prisma.user.upsert({
    where: { email: 'officer@test.com' },
    update: {},
    create: {
      email: 'officer@test.com',
      name: 'Officer User',
      role: Role.OFFICER,
    },
  });
  console.log(`✅ 成功创建测试用户: ${officerUser.email} (Role: ${officerUser.role})`);

  const studentUser = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Student User',
      role: Role.STUDENT,
    },
  });
  console.log(`✅ 成功创建测试用户: ${studentUser.email} (Role: ${studentUser.role})`);

  // ==========================================
  // 2. 播种 UH 真实社团数据 (Issue #28)
  // ==========================================
  
  console.log('🏫 开始填充 UH 社团数据...');

  const uhClubs = [
    {
      name: 'ACM Manoa',
      description: 'Association for Computing Machinery at UH Manoa. We host workshops, hackathons, and networking events for students interested in computer science and software engineering.',
      email: 'acm@hawaii.edu',
      meetingTime: 'Fridays at 4:30 PM',
      location: 'POST 318B',
      category: 'Academic/Professional',
      status: ClubStatus.ACTIVE,
    },
    {
      name: 'UH Esports Association',
      description: 'The official esports organization for the University of Hawaii. We field competitive collegiate teams for Valorant, League of Legends, Overwatch, and more.',
      email: 'esports@hawaii.edu',
      meetingTime: 'Saturdays at 2:00 PM',
      location: 'iLab',
      category: 'Recreational/Gaming',
      status: ClubStatus.ACTIVE,
    },
    {
      name: 'Grey Hats Cyber Security Club',
      description: 'Dedicated to learning and practicing ethical hacking, cybersecurity principles, and participating in Capture the Flag (CTF) competitions.',
      email: 'greyhats@hawaii.edu',
      meetingTime: 'Wednesdays at 5:00 PM',
      location: 'POST 319',
      category: 'Academic/Professional',
      status: ClubStatus.ACTIVE,
    },
    {
      name: 'Photography Club at UHM',
      description: 'A community for students passionate about photography to share knowledge, go on photo walks, and organize exhibitions.',
      email: 'photouhm@hawaii.edu',
      meetingTime: 'Tuesdays at 3:30 PM',
      location: 'Campus Center 309',
      category: 'Arts & Culture',
      status: ClubStatus.ACTIVE,
    },
    {
      name: 'New Club Pending Approval',
      description: 'This is a brand new club waiting for admin approval to show up on the directory.',
      email: 'newclub@hawaii.edu',
      meetingTime: 'TBD',
      location: 'TBD',
      category: 'Other',
      status: ClubStatus.PENDING, // 测试 PENDING 状态
    }
  ];

  for (const club of uhClubs) {
    const createdClub = await prisma.club.upsert({
      where: { name: club.name },
      update: {}, // 如果名称已存在则不作任何修改
      create: {
        name: club.name,
        description: club.description,
        email: club.email,
        meetingTime: club.meetingTime,
        location: club.location,
        category: club.category,
        status: club.status,
        officerId: officerUser.id, // 将所有测试社团挂载到 Officer 测试账号下
      },
    });
    console.log(`✅ 成功创建社团: ${createdClub.name} (Status: ${createdClub.status})`);
  }

  console.log('🎉 所有数据播种完成！');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ 播种失败:', e);
    await prisma.$disconnect();
    process.exit(1);
  });