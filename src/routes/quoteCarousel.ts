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
router.delete('/:id', requireAdmin, deleteQuoteItem)

export default router

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Get all quote carousel items
 *     tags: [Quotes]
 *     responses:
 *       200:
 *         description: List of quote carousel items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   quote:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   fullname:
 *                     type: string
 *                   position:
 *                     type: string
 *   post:
 *     summary: Create a new quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quote
 *               - rating
 *               - fullname
 *               - position
 *             properties:
 *               quote:
 *                 type: string
 *               rating:
 *                 type: number
 *               fullname:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quote carousel item created successfully
 *       401:
 *         description: Unauthorized
 * 
 * /api/quotes/{id}:
 *   put:
 *     summary: Update a quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quote
 *               - rating
 *               - fullname
 *               - position
 *             properties:
 *               quote:
 *                 type: string
 *               rating:
 *                 type: number
 *               fullname:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quote carousel item updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote carousel item not found
 *   delete:
 *     summary: Delete a quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quote carousel item deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote carousel item not found
 */
