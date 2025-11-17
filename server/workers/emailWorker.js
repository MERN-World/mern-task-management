import { Worker } from 'bullmq'
import connectDB from '../config/db.js'
import redisConnection from '../config/redis.js'
import { sendEmail } from '../services/setting/emailService.js'


connectDB()

const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { to, subject, text, html } = job.data
    await sendEmail({ to, subject, text, html })
  },
  {
    connection: redisConnection,
    concurrency: 5
  }
)

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed: ${err.message}`)
})
