import { Request, Response } from 'express'
import PracticeSchema from '../models/Practice'

export const createPractice = async (req: Request, res: Response) => {
  const practice = await PracticeSchema.create(req.body)
  res.status(201).json({
    message: 'Practice created successfully',
    practice,
  })
}

export const getPractice = async (_req: Request, res: Response) => {
  const practice = await PracticeSchema.find().sort({ createdAt: -1 }).limit(4)
  res.status(200).json({
    message: 'Practice fetched successfully',
    practice,
  })
}

export const getPracticeById = async (req: Request, res: Response) => {
  const practice = await PracticeSchema.findById(req.params.id)

  if (!practice) {
    res.status(404).json({
      message: 'Practice not found',
    })
    return
  }

  res.status(200).json({
    message: 'Practice fetched successfully',
    practice,
  })
}

export const updatePractice = async (req: Request, res: Response) => {
  const practice = await PracticeSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!practice) {
    res.status(404).json({
      message: 'Practice not found',
    })
    return
  }

  res.status(200).json({
    message: 'Practice updated successfully',
    practice,
  })
}

export const deletePractice = async (req: Request, res: Response) => {
  const practice = await PracticeSchema.findByIdAndDelete(req.params.id)

  if (!practice) {
    res.status(404).json({
      message: 'Practice not found',
    })
    return
  }

  res.status(200).json({
    message: 'Practice deleted successfully',
  })
}
