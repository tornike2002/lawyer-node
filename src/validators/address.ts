import z from 'zod'

export const addressSchema = z.object({
  city: z.string().min(1),
  street: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
})
