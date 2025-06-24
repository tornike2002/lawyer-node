import { VercelRequest, VercelResponse } from '@vercel/node'
import dotenv from 'dotenv'
dotenv.config()

import app from '../src/server'
import connectDB from '../src/config/db'
import { setupSwagger } from '../src/config/swagger'

let isConnected = false

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to database only once
  if (!isConnected) {
    try {
      await connectDB()
      setupSwagger(app)
      isConnected = true
    } catch (error) {
      console.error('Database connection failed:', error)
      return res.status(500).json({ error: 'Database connection failed' })
    }
  }

  // Handle the request with Express app
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) {
        console.error('Express error:', err)
        reject(err)
      } else {
        resolve(undefined)
      }
    })
  })
} 