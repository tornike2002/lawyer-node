import { VercelRequest, VercelResponse } from '@vercel/node'
import dotenv from 'dotenv'

// Configure environment variables first
dotenv.config()

import app from '../src/server'
import connectDB from '../src/config/db'
import { setupSwagger } from '../src/config/swagger'

let isConnected = false

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Connect to database only once per function instance
    if (!isConnected) {
      console.log('Connecting to database...')
      await connectDB()
      
      try {
        console.log('Setting up Swagger...')
        setupSwagger(app)
        console.log('Swagger setup complete')
      } catch (swaggerError) {
        console.warn('Swagger setup failed (non-critical):', swaggerError)
      }
      
      isConnected = true
      console.log('Initialization complete')
    }

    // Use Express app as middleware
    app(req as any, res as any)
  } catch (error) {
    console.error('Server error:', error)
    
    // Make sure response hasn't been sent already
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Something went wrong'
      })
    }
  }
} 