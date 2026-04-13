import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Manager
  await prisma.user.upsert({
    where: { email: 'admin@crmts.com' },
    update: {},
    create: {
      email: 'admin@crmts.com',
      password: 'admin123', // In real app, this should be hashed
      name: 'System Admin',
      role: 'MANAGER',
    },
  });

  // Create Staff
  await prisma.user.upsert({
    where: { email: 'staff@crmts.com' },
    update: {},
    create: {
      email: 'staff@crmts.com',
      password: 'staff123',
      name: 'Marketing Staff',
      role: 'STAFF',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
