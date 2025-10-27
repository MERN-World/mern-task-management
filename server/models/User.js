import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ],
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission'
    }
  ]
})

export default mongoose.model('User', userSchema)
