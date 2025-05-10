import { Router } from 'express'
import { bannersSchema } from '../validators/banners'
import { getAllBanners, updateBanners, createBanners, deleteBanners } from '../controllers/banners'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
const router = Router()

// public routes
router.get('/', getAllBanners)

// admin routes
router.post('/', requireAdmin, validate(bannersSchema), createBanners)
router.put('/:id', requireAdmin, validate(bannersSchema), updateBanners)
router.delete('/:id', requireAdmin, deleteBanners)

export default router

/**
 * @swagger
 * /api/banners:
 *   get:
 *     summary: Get all banner items
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banner items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 *   post:
 *     summary: Create a new banner item
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *               link:
 *                 type: string
 *                 format: uri
 *               image:
 *                 type: string
 *                 format: uri
 *               revenue:
 *                 type: string
 *                 minLength: 1
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Created banner item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/banners/{id}:
 *   put:
 *     summary: Update a banner item
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *               link:
 *                 type: string
 *                 format: uri
 *               image:
 *                 type: string
 *                 format: uri
 *               revenue:
 *                 type: string
 *                 minLength: 1
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Updated banner item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Banner item not found
 *   delete:
 *     summary: Delete a banner item
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Banner item not found
 */
