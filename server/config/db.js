import mongoose from 'mongoose'
import { env } from './env.js'

const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL)
    console.log('Database Connected Successfully...')
  } catch (error) {
    console.error('Database Connection Failed:', error.message)
    process.exit(1)
  }
}

export default connectDB
