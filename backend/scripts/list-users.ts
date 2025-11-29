import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        candidate: {
          select: {
            firstName: true,
            lastName: true,
            profession: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log('\n📊 Current Users in Database:\n')
    console.log(`Total users: ${users.length}\n`)

    if (users.length === 0) {
      console.log('No users found in the database.')
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`)
        console.log(`   Role: ${user.role}`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Created: ${user.createdAt.toLocaleString()}`)
        if (user.candidate) {
          console.log(`   Candidate: ${user.candidate.firstName} ${user.candidate.lastName}`)
          if (user.candidate.profession) {
            console.log(`   Profession: ${user.candidate.profession}`)
          }
        }
        if (user.company) {
          console.log(`   Company: ${user.company.name}`)
        }
        console.log('')
      })
    }
  } catch (error) {
    console.error('❌ Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()

