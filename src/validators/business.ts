import z from 'zod'

export const createBusinessSchema = z.object({
  icon: z.string().url(),
  image: z.string().url(),
})
