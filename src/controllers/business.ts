import { Request, Response } from 'express'
import Business from '../models/Business'

export const createBusiness = async (req: Request, res: Response) => {
  const data = await Business.create(req.body)
  res.status(201).json({ message: 'Business created successfully', data })
}

export const getAllBusinesses = async (_req: Request, res: Response) => {
  const data = await Business.find().sort({ createdAt: -1 }).limit(10)
  res.status(200).json({ message: 'Businesses fetched successfully', data })
}

export const updateBusiness = async (req: Request, res: Response) => {
  const data = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!data) {
    res.status(404).json({ message: 'Business not found' })
    return
  }
  res.status(200).json({ message: 'Business updated successfully', data })
}

export const deleteBusiness = async (req: Request, res: Response) => {
  const data = await Business.findByIdAndDelete(req.params.id)
  if (!data) {
    res.status(404).json({ message: 'Business not found' })
    return
  }
  res.status(200).json({ message: 'Business deleted successfully' })
}
