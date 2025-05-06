import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { createBusinessSchema } from '../validators/business'
import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  updateBusiness,
} from '../controllers/business'

const router = Router()

// public routes
router.get('/', getAllBusinesses)

// admin routes
router.post('/', requireAdmin, validate(createBusinessSchema), createBusiness)
router.put('/:id', requireAdmin, validate(createBusinessSchema), updateBusiness)
router.delete('/:id', requireAdmin, deleteBusiness)

export default router
/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: List of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Business'
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Business'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 * 
 * /api/business/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInput'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Business'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Business not found
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Business not found
 * 
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         icon:
 *           type: string
 *           format: uri
 *         image:
 *           type: string
 *           format: uri
 *     BusinessInput:
 *       type: object
 *       required:
 *         - icon
 *         - image
 *       properties:
 *         icon:
 *           type: string
 *           format: uri
 *         image:
 *           type: string
 *           format: uri
 */
