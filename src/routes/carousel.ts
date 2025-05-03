import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { carouselSchema } from '../validators/carousel'
import {
  getAllCarousel,
  createCarousel,
  updateCarousel,
  deleteCarouselItem,
} from '../controllers/carousel'

const router = Router()

// public routes
router.get('/', getAllCarousel)

// admin routes
router.post('/', requireAdmin, validate(carouselSchema), createCarousel)
router.put('/:id', requireAdmin, validate(carouselSchema), updateCarousel)
router.delete('/:id', requireAdmin, deleteCarouselItem)

export default router
