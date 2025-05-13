import z from 'zod'

export const practiceSchema = z.object({
  position: z.string().min(3),
  image: z.string().url(),
  title: z.string().min(3),
  description: z.string().min(3),
})
