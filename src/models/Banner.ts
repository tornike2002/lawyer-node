import mongoose from 'mongoose'

const bannersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    revenue: { type: String },
  },
  { timestamps: true },
)

const Banners = mongoose.model('Banners', bannersSchema)

export default Banners
