import mongoose from 'mongoose'

export const EMAIL_STATUS = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const emailLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String },
  status: { 
    type: String, 
    enum: Object.values(EMAIL_STATUS), 
    required: true 
  },
  error: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('EmailLog', emailLogSchema)
