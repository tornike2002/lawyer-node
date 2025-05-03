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

/**
 * @swagger
 * /api/carousel:
 *   get:
 *     summary: Get all carousel items
 *     tags: [Carousel]
 *     responses:
 *       200:
 *         description: List of carousel items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carousel'
 *   post:
 *     summary: Create a new carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarouselInput'
 *     responses:
 *       201:
 *         description: Created carousel item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carousel'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 * 
 * /api/carousel/{id}:
 *   put:
 *     summary: Update a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/CarouselInput'
 *     responses:
 *       200:
 *         description: Updated carousel item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carousel'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Carousel not found
 *   delete:
 *     summary: Delete a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Carousel not found
 * 
 * components:
 *   schemas:
 *     Carousel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CarouselInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 */
