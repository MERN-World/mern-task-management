import nodemailer from 'nodemailer'
import { env } from './env.js'

const {EMAIL_SERVICE,EMAIL_USER,EMAIL_PASS} = env || {}

const mailer = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  pool: true,
  maxConnections: 20,
  maxMessages: 50,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default mailer