import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth'
import carouselRoutes from './routes/carousel'
import bannersRoutes from './routes/banners'
import quoteRoutes from './routes/quoteCarousel'
import partnerRoutes from './routes/partner'
import contactRoutes from './routes/contact'
import faqRoutes from './routes/faq'
import practiceRoutes from './routes/practice'
import blogRoutes from './routes/blogs'
import categoryRoutes from './routes/category'
import tagRoutes from './routes/tags'
import businessRoutes from './routes/business'
import commentRoutes from './routes/comment'
import addressRoutes from './routes/address'
const app = express()

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Suits API is running!',
    version: '1.0.0',
    status: 'healthy',
    endpoints: [
      'GET /api/auth',
      'GET /api/carousel', 
      'GET /api/banners',
      'GET /api/quotes',
      'GET /api/partner',
      'GET /api/contact',
      'GET /api/faq',
      'GET /api/practice',
      'GET /api/blogs',
      'GET /api/categories',
      'GET /api/tags',
      'GET /api/business',
      'GET /api/comment',
      'GET /api/address'
    ]
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/carousel', carouselRoutes)
app.use('/api/banners', bannersRoutes)
app.use('/api/quotes', quoteRoutes)
app.use('/api/partner', partnerRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/faq', faqRoutes)
app.use('/api/practice', practiceRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/business', businessRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/address', addressRoutes)

// Catch-all handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /health',
      'GET /api/*'
    ]
  })
})

export default app
