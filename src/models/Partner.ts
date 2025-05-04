import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    position: { type: String, required: true },
    about: { type: String, required: true },
    biography: { type: String, required: true },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    contact: {
      linkedin: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    services: { type: [String], default: [] },
  },
  { timestamps: true },
)

const PartnerSchema = mongoose.model('Partner', partnerSchema)

export default PartnerSchema
