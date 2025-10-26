import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { env } from './config/env.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  return res.json({
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime().toFixed(2) + "s",
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URL)
    console.log('✅ MongoDB Connected Successfully')
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message)
    process.exit(1)
  }
}

const startServer = async () => {
  await connectDB();
  app.listen(env.PORT, () => console.log(`🚀 Server running on port ${env.PORT}`));
};

startServer();