import express from 'express'
import cors from 'cors'
import router from './routes/index.js'


const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to the API',
    info: {
      name: 'MyApp API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime().toFixed(0) + 's',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/',
        api_base: '/api',
        docs: '/api/docs (if available)',
      },
    },
  })
})


app.use("/api", router);


export default app