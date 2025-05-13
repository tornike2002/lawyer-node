import mongoose from 'mongoose'

const practiceSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

const PracticeSchema = mongoose.model('Practice', practiceSchema)

export default PracticeSchema
