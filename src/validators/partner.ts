import z from 'zod'

export const partnerSchema = z.object({
  fullname: z.string().min(1),
  position: z.string().min(1),
  about: z.string().min(1),
  biography: z.string().min(1),
  image: z.string().url(),
  cover: z.string().url().optional(),
  contact: z.object({
    linkedin: z.string().url().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
  services: z.array(z.string().optional()),
})
