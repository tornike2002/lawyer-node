import mongoose from 'mongoose'

const QuoteCarouselSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  rating: { type: Number, required: true },
  fullname: { type: String, required: true },
  position: { type: String, required: true },
})

const QuoteSchema = mongoose.model('Quote', QuoteCarouselSchema)

export default QuoteSchema
