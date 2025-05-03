import z from 'zod'

export const bannersSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  banners: z.object({
    left: z.object({
      title: z.string().min(1),
      link: z.string().url().optional(),
    }),
    right: z.object({
      title: z.string().min(1),
      link: z.string().url().optional(),
      revenue: z.string().optional(),
    }),
  }),
})
