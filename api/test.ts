import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Test endpoint called:', req.method, req.url)
    
    res.status(200).json({
      message: 'Test endpoint working!',
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
      environment: {
        node_env: process.env.NODE_ENV,
        has_mongo_url: !!process.env.MONGO_URL,
        has_jwt_secret: !!process.env.JWT_SECRET
      }
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    res.status(500).json({
      error: 'Test endpoint failed',
      message: (error as Error).message
    })
  }
} 