import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { quoteCarouselSchema } from '../validators/quoteCarousel'
import {
  getAllQuoteItems,
  updateQuoteItem,
  createQuoteItem,
  deleteQuoteItem,
} from '../controllers/quoteCarousel'

const router = Router()

// public routes
router.get('/', getAllQuoteItems)

// admin routes
router.post('/', requireAdmin, validate(quoteCarouselSchema), createQuoteItem)
router.put('/:id', requireAdmin, validate(quoteCarouselSchema), updateQuoteItem)
router.delete('/:id', requireAdmin, validate(quoteCarouselSchema), deleteQuoteItem)
