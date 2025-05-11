import { Router } from 'express'
import { createAddress, getAddress, updateAddress, deleteAddress } from '../controllers/address'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { addressSchema } from '../validators/address'

const router = Router()

// public routes
router.get('/', getAddress)

// admin routes
router.post('/', requireAdmin, validate(addressSchema), createAddress)
router.put('/:id', requireAdmin, validate(addressSchema), updateAddress)
router.delete('/:id', requireAdmin, deleteAddress)

export default router

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           minLength: 1
 *         street:
 *           type: string
 *           minLength: 1
 *         phone:
 *           type: string
 *           minLength: 1
 *         email:
 *           type: string
 *           format: email
 *       required:
 *         - city
 *         - street
 *         - phone
 *         - email
 * 
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get address information
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: Address information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *   post:
 *     summary: Create new address information (Admin only)
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 * 
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Update address information (Admin only)
 *     tags: [Address]
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
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *   delete:
 *     summary: Delete address information (Admin only)
 *     tags: [Address]
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
 *         description: Address deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
