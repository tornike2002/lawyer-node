import { Request, Response } from 'express'
import Banner from '../models/Banner'

export const getAllBanners = async (_req: Request, res: Response) => {
  const data = await Banner.find().sort({ createdAt: -1 }).limit(2)
  res.status(200).json({ message: 'Banners fetched successfully', data })
}

export const createBanners = async (req: Request, res: Response) => {
  const data = await Banner.create(req.body)
  res.status(201).json({ message: 'Banners created successfully', data })
}

export const updateBanners = async (req: Request, res: Response) => {
  const data = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!data) {
    res.status(404).json({ message: 'Banners item not found' })
    return
  }
  res.status(200).json({ message: 'Banners updated successfully', data })
}

export const deleteBanners = async (req: Request, res: Response) => {
  const data = await Banner.findByIdAndDelete(req.params.id)

  if (!data) {
    res.status(404).json({ message: 'Banner item not found' })
    return
  }
  res.status(200).json({ message: 'Banner item deleted successfully' })
}
