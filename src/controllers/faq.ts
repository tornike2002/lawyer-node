import { Request, Response } from 'express'
import FaqSchema from '../models/Faq'

export const createFaq = async (req: Request, res: Response) => {
  const faq = await FaqSchema.create(req.body)
  res.status(201).json({ message: 'Faq created successfully', faq })
}

export const getFaqs = async (_req: Request, res: Response) => {
  const faqs = await FaqSchema.find().sort({ createdAt: -1 })
  res.status(200).json({ message: 'Faqs fetched successfully', faqs })
}

export const updateFaq = async (req: Request, res: Response) => {
  const faqs = await FaqSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!faqs) {
    res.status(404).json({ message: 'Faq not found' })
    return
  }
  res.status(200).json({ message: 'Faq updated successfully', faqs })
}

export const deleteFaq = async (req: Request, res: Response) => {
  const faqs = await FaqSchema.findByIdAndDelete(req.params.id)
  if (!faqs) {
    res.status(404).json({ message: 'Faq not found' })
    return
  }
  res.status(200).json({ message: 'Faq deleted successfully' })
}
