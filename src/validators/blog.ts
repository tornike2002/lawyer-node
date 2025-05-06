import z from 'zod'

const createBlogSchema = z.object({
  title: z.string().min(3),
  subTitle: z.string().min(3).optional(),
  slug: z.string().min(3),
  content: z.string().min(10),
  images: z.array(z.string().url()),
  category: z.string().min(3),
  tags: z.array(z.string()).min(1),
  author: z.string().min(3),
  share: z.object({
    facebook: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    x: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }),
  lawWays: z.string().min(3).optional(),
})

const updateBlogSchema = createBlogSchema.partial()

export { createBlogSchema, updateBlogSchema }

