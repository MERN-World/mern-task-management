import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jti: { type: String, required: true, index: true, unique: true }, 
  tokenHash: { type: String, required: true },
  createdByIp: String,
  revokedAt: Date,
  revokedByIp: String,
  replacedBy: { type: String, default: null }, 
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  deviceInfo: String
});

export default mongoose.model("RefreshToken", refreshTokenSchema);
