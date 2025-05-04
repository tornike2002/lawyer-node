import z from 'zod'

export const bannersSchema = z.object({
  title: z.string().min(1),
  link: z.string().url().optional(),
  image: z.string().url().optional(),
  revenue: z.string().min(1).optional(),
})
