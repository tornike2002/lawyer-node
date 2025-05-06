import { Request, Response } from 'express'
import Tag from '../models/Tags'

export const createTag = async (req: Request, res: Response) => {
  const data = await Tag.create(req.body)
  res.status(201).json({ message: 'Tag created successfully', data })
}

export const getAllTags = async (_req: Request, res: Response) => {
  const data = await Tag.find().sort({ createdAt: -1 })
  res.status(200).json({ message: 'Tags fetched successfully', data })
}

export const updateTag = async (req: Request, res: Response) => {
  const data = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!data) {
    res.status(404).json({ message: 'Tag not found' })
    return
  }
  res.status(200).json({ message: 'Tag updated successfully', data })
}

export const deleteTag = async (req: Request, res: Response) => {
  const data = await Tag.findByIdAndDelete(req.params.id)
  if (!data) {
    res.status(404).json({ message: 'Tag not found' })
    return
  }
  res.status(200).json({ message: 'Tag deleted successfully'})
}
