import connectDB from './config/db.js'
import app from './app.js'
import {env} from './config/env.js'

const startServer = async () => {
  await connectDB();
  app.listen(env.PORT, () => console.log(`🚀 Server running... http://localhost:${env.PORT}`));
};

startServer();