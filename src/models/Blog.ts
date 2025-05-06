import mongoose from 'mongoose'
import slugify from 'slugify'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    images: { type: [{ type: String }], required: true },
    category: { type: String, required: true },
    tags: { type: [{ type: String }], required: true },
    author: { type: String, required: true },
    share: {
      facebook: { type: String },
      linkedin: { type: String },
      x: { type: String },
      instagram: { type: String },
    },
    lawWays: {
      type: String,
    },
  },
  { timestamps: true },
)

blogSchema.pre('save', function (next) {
  if (this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

blogSchema.index({ title: 'text', content: 'text' })
blogSchema.index({ category: 1 })
blogSchema.index({ tags: 1 })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
