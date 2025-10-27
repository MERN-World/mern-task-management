import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 255,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: null
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

export default mongoose.model('Role', roleSchema)
