import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

const Business = mongoose.model('Business', businessSchema)

export default Business
