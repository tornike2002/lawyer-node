import mongoose from 'mongoose'

const adressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const Adress = mongoose.model('Adress', adressSchema)

export default Adress
