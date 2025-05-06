import z from 'zod'

export const practiceSchema = z.object({
  position: z.string().min(3),
  image: z.array(z.string().url()),
  title: z.string().min(3),
  description: z.string().min(3),
  rights: z.array(z.string()).optional(),
  single: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).optional(),
  }),
})
