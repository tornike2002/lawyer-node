import mongoose from 'mongoose'

const bannersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    banners: {
      left: {
        title: { type: String, required: true },
        link: { type: String },
      },
      right: {
        title: { type: String, required: true },
        link: { type: String },
        revenue: { type: String },
      },
    },
  },
  { timestamps: true },
)

const Banners = mongoose.model('Banners', bannersSchema)

export default Banners
