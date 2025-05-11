import { Request, Response } from 'express'
import Adress from '../models/Adress'

export const createAddress = async (req: Request, res: Response) => {
  const address = await Adress.create(req.body)
  res.status(201).json({
    message: 'Address created successfully',
    address,
  })
}

export const getAddress = async (_req: Request, res: Response) => {
  const address = await Adress.find().sort({ createdAt: -1 }).limit(3)
  res.status(200).json({
    message: 'Address fetched successfully',
    address,
  })
}

export const updateAddress = async (req: Request, res: Response) => {
  const address = await Adress.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!address) {
    res.status(404).json({
      message: 'Address not found',
    })
    return
  }
  
  res.status(200).json({
    message: 'Address updated successfully',
    address,
  })
}

export const deleteAddress = async (req: Request, res: Response) => {
  const address = await Adress.findByIdAndDelete(req.params.id)
  if (!address) {
    res.status(404).json({
      message: 'Address not found',
    })
    return
  }
  res.status(200).json({
    message: 'Address deleted successfully',
  })
}
