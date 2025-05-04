import z from 'zod'

export const quoteCarouselSchema = z.object({
  quote: z.string().min(1),
  rating: z.number().min(0).max(5),
  fullname: z.string().min(1),
  positon: z.string().min(1),
})
