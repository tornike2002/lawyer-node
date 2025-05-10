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
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

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
export default app
