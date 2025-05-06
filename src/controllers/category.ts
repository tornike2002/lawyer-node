import { Request, Response } from 'express'
import Category from '../models/Category'

export const createCategory = async (req: Request, res: Response) => {
  const data = await Category.create(req.body)
  res.status(201).json({ message: 'Category created successfully', data })
}

export const getAllCategories = async (req: Request, res: Response) => {
  const data = await Category.find()
  res.status(200).json({ message: 'Categories fetched successfully', data })
}

export const updateCategory = async (req: Request, res: Response) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!data) {
    res.status(404).json({ message: 'Category not found' })
    return
  }
  res.status(200).json({ message: 'Category updated successfully', data })
}

export const deleteCategory = async (req: Request, res: Response) => {
  const data = await Category.findByIdAndDelete(req.params.id)
  if (!data) {
    res.status(404).json({ message: 'Category not found' })
    return
  }
  res.status(200).json({ message: 'Category deleted successfully', data })
}
