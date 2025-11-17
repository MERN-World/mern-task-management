import { Redis } from 'ioredis'
import {env} from './env.js'
const {REDIS_HOST,REDIS_PORT} = env

const connection = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  maxRetriesPerRequest: null,   
});

export default connection