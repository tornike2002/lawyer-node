import { Router } from 'express'
import {
  createPractice,
  getPractice,
  getPracticeById,
  updatePractice,
  deletePractice,
} from '../controllers/practice'
import { validate } from '../middlewares/validate'
import { practiceSchema } from '../validators/practice'
import { requireAdmin } from '../middlewares/auth'

const router = Router()


// public
router.get('/', getPractice)
router.get('/:id', getPracticeById)

// admin
router.post('/', requireAdmin, validate(practiceSchema), createPractice)
router.put('/:id', requireAdmin, validate(practiceSchema), updatePractice)
router.delete('/:id', requireAdmin, deletePractice)

export default router

/**
 * @swagger
 * tags:
 *   name: Practice
 *   description: Practice management endpoints
 * 
 * /practice:
 *   get:
 *     summary: Get all practice items
 *     tags: [Practice]
 *     responses:
 *       200:
 *         description: List of practice items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Practice fetched successfully
 *                 practice:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Practice'
 *   post:
 *     summary: Create a new practice item
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Practice'
 *     responses:
 *       201:
 *         description: Practice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Practice created successfully
 *                 practice:
 *                   $ref: '#/components/schemas/Practice'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation error
 * 
 * /practice/{id}:
 *   get:
 *     summary: Get practice by ID
 *     tags: [Practice]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Practice ID
 *     responses:
 *       200:
 *         description: Practice fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Practice fetched successfully
 *                 practice:
 *                   $ref: '#/components/schemas/Practice'
 *       404:
 *         description: Practice not found
 *   put:
 *     summary: Update practice by ID
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Practice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Practice'
 *     responses:
 *       200:
 *         description: Practice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Practice updated successfully
 *                 practice:
 *                   $ref: '#/components/schemas/Practice'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Practice not found
 *   delete:
 *     summary: Delete practice by ID
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Practice ID
 *     responses:
 *       200:
 *         description: Practice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Practice deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Practice not found
 * 
 * components:
 *   schemas:
 *     Practice:
 *       type: object
 *       required:
 *         - position
 *         - image
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         position:
 *           type: string
 *           minLength: 3
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: url
 *         title:
 *           type: string
 *           minLength: 3
 *         description:
 *           type: string
 *           minLength: 3
 *         rights:
 *           type: array
 *           items:
 *             type: string
 *         single:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               minLength: 3
 *             description:
 *               type: string
 *               minLength: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
