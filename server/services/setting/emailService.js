// services/emailService.js
import nodemailer from "nodemailer"
import EmailLog from '../../models/EmailLog.js'
import { EMAIL_STATUS } from "../../models/EmailLog.js";
import {env} from '../../config/env.js'

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SERVICE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    let info = await transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    await EmailLog.create({
      to,
      subject,
      body: text || html,
      status: EMAIL_STATUS.SUCCESS
    });

    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    await EmailLog.create({
      to,
      subject,
      body: text || html,
      status: EMAIL_STATUS.FAILED,
      error: error.message,
    });

    console.error("Email sending failed: ", error.message);
    throw error;
  }
};
