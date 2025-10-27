import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100
    },
    module: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
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
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

export default mongoose.model('Permission', permissionSchema)
