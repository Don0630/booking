import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'Admin',
        status: 'Active',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'User',
        status: 'Active',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: hashedPassword,
        role: 'User',
        status: 'Inactive',
      },
      {
        name: 'Alice Brown',
        email: 'alice@example.com',
        password: hashedPassword,
        role: 'Editor',
        status: 'Active',
      },
      {
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        password: hashedPassword,
        role: 'User',
        status: 'Active',
      },
    ],
  })
  console.log('✅ Seed data inserted!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
