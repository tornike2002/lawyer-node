import { Request, Response } from 'express'
import Banners from '../models/Banners'

export const getAllBanners = async (req: Request, res: Response) => {
  const data = await Banners.find()
  res.status(200).json(data)
}

export const createBanners = async (req: Request, res: Response) => {
  const data = Banners.create(req.body)
  res.status(201).json(data)
}

export const updateBanners = async (req: Request, res: Response) => {
  const data = await Banners.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!data) {
    res.status(404).json({ message: 'Banners item not found' })
    return
  }
  res.status(200).json(data)
}

export const deleteBanners = async (req: Request, res: Response) => {
  const data = Banners.findByIdAndDelete(req.params.id)

  if (!data) {
    res.status(404).json({ message: 'Banner item not found' })
    return
  }
  res.status(200).json({ message: 'Banner item deleted successfully' })
}
