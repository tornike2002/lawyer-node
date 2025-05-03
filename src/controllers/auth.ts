import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'
import { generateToken } from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) {
    res.status(400).json({
      message: 'Admin already exists',
    })
    return
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const admin = await Admin.create({
    email,
    password: hashedPassword,
  })

  const token = generateToken(admin._id.toString())
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV !== 'development',
  })
  res.status(201).json({
    message: 'Admin registered successfully',
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (!admin) {
    res.status(401).json({
      message: 'Invalid credentials',
    })
    return
  }
  const match = await bcrypt.compare(password, admin.password)
  if (!match) {
    res.status(401).json({
      message: 'Invalid credentials',
    })
    return
  }
  const token = generateToken(admin._id.toString())
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV !== 'development',
  })
  res.status(200).json({
    message: 'Admin logged in successfully',
  })
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token')
  res.status(200).json({
    message: 'Admin logged out successfully',
  })
}


