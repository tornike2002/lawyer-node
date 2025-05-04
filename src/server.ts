import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth'
import carouselRoutes from './routes/carousel'
import bannersRoutes from './routes/banners'
import quoteRoutes from './routes/quoteCarousel'
import partnerRoutes from './routes/partner'

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

export default app
