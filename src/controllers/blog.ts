import { Request, Response } from 'express'
import Blog from '../models/Blog'
import slugify from 'slugify'

interface BlogFilters {
  category?: string
  tag?: {
    $in: string[]
  }
  search?: {
    $search: string
  }
  page?: number
  limit?: number
}

export const createBlog = async (req: Request, res: Response) => {
  const slug = slugify(req.body.title, { lower: true, strict: true })

  const exists = await Blog.findOne({ slug })

  if (exists) {
    res.status(400).json({ message: 'Blog already exists' })
    return
  }

  const blog = await Blog.create({ ...req.body, slug })
  res.status(201).json({ message: 'Blog created successfully', data: blog })
}

export const getAllBlogs = async (req: Request, res: Response) => {
  const { category, tags, search, page = 1, limit = 5 } = req.query

  const filters: BlogFilters = {}
  if (category) filters.category = category as string
  if (tags) filters.tag = { $in: (tags as string).split(',') }
  if (search) filters.search = { $search: search as string }

  const skip = (Number(page) - 1) * Number(limit)
  const [blogs, total] = await Promise.all([
    Blog.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(filters),
  ])

  res.status(200).json({
    page: Number(page),
    total,
    totalPages: Math.ceil(total / Number(limit)),
    data: blogs,
    message: 'Blogs fetched successfully',
  })
}

export const getBlogBySlug = async (req: Request, res: Response) => {
  const data = await Blog.findOne({ slug: req.params.slug })
  if (!data) {
    res.status(404).json({ message: 'Blog not found' })
    return
  }
  res.status(200).json({ message: 'Blog fetched successfully', data })
}

export const getLatestBlogs = async (_req: Request, res: Response) => {
  const data = await Blog.find().sort({ createdAt: -1 }).limit(3)
  res.status(200).json({ message: 'Latest blogs fetched successfully', data })
}

export const updateBlog = async (req: Request, res: Response) => {
  const data = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!data) {
    res.status(404).json({ message: 'Blog not found' })
    return
  }
  res.status(200).json({ message: 'Blog updated successfully', data })
}

export const deleteBlog = async (req: Request, res: Response) => {
  const data = await Blog.findByIdAndDelete(req.params.id)
  if (!data) {
    res.status(404).json({ message: 'Blog not found' })
    return
  }
  res.status(200).json({ message: 'Blog deleted successfully' })
}
