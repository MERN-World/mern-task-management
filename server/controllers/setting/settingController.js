import { sendEmail } from '../../services/setting/emailService.js'
import { successResponse, errorResponse } from '../../utils/responseHandler.js'
import emailQueue from '../../queues/emailQueue.js'

export const sendTestEmail = async (req, res) => {
  const { to, subject, text, html } = req.body
  try {
    await emailQueue.add(
      'sendMail',
      { to, subject, text, html },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 }
      }
    )
    //const info = await sendEmail({ to, subject, text, html })
    return successResponse(res, 'Email send success')
  } catch (error) {
    return errorResponse(res, error.message)
  }
}
