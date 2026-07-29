import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create or ensure an officer User exists
  const officer = await prisma.user.upsert({
    where: { email: 'officer@hawaii.edu' },
    update: {},
    create: {
      email: 'officer@hawaii.edu',
      name: 'Jane Doe',
      role: 'OFFICER',
    },
  });

  // Create or update the Club linked to that officer
  await prisma.club.upsert({
    where: { name: 'Software Engineering Club' },
    update: {
      description: 'Default Test Club Description',
      email: 'test@hawaii.edu',
      meetingTime: 'Tuesdays at 3:00 PM',
      location: 'POST 318B',
      status: 'ACTIVE',
    },
    create: {
      id: 'test-club-1',
      name: 'Software Engineering Club',
      status: 'ACTIVE',
      description: 'Default Test Club Description',
      email: 'test@hawaii.edu',
      meetingTime: 'Tuesdays at 3:00 PM',
      location: 'POST 318B',
      officerId: officer.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });