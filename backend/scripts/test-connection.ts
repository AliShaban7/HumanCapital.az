import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...\n')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Successfully connected to MongoDB!\n')
    
    // Test query
    const userCount = await prisma.user.count()
    console.log(`📊 Database Status:`)
    console.log(`   - Users: ${userCount}`)
    
    const candidateCount = await prisma.candidate.count()
    console.log(`   - Candidates: ${candidateCount}`)
    
    const companyCount = await prisma.company.count()
    console.log(`   - Companies: ${companyCount}`)
    
    const jobCount = await prisma.job.count()
    console.log(`   - Jobs: ${jobCount}`)
    
    console.log('\n✅ All database operations working correctly!')
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message)
    if (error.code === 'P2010') {
      console.error('\n💡 Possible issues:')
      console.error('   1. Check MongoDB Atlas IP whitelist')
      console.error('   2. Verify username and password')
      console.error('   3. Check network connectivity')
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

