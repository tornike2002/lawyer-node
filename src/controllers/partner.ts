import { Request, Response } from 'express'
import PartnerSchema from '../models/Partner'

export const createPartner = async (req: Request, res: Response) => {
  const data = await PartnerSchema.create(req.body)
  res.status(201).json(data)
}

export const getAllPartners = async (req: Request, res: Response) => {
  const partners = await PartnerSchema.find().sort({ createdAt: -1 })
  res.status(200).json(partners)
}

export const updatePartner = async (req: Request, res: Response) => {
  const data = await PartnerSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!data) {
    res.status(404).json({ message: 'Partner not found' })
    return
  }
  res.status(200).json(data)
}

export const deletePartner = async (req: Request, res: Response) => {
  const data = await PartnerSchema.findByIdAndDelete(req.params.id)
  if (!data) {
    res.status(404).json({ message: 'Partner not found' })
    return
  }
  res.status(200).json({ message: 'Partner deleted successfully' })
}
