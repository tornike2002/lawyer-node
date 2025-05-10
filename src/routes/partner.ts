import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { partnerSchema } from '../validators/partner'
import { requireAdmin } from '../middlewares/auth'
import { getAllPartners, createPartner, updatePartner, deletePartner, getPartnerById } from '../controllers/partner'

const router = Router()

// public
router.get('/', getAllPartners)
router.get('/:id', getPartnerById)

// admin
router.post('/', requireAdmin, validate(partnerSchema), createPartner)
router.put('/:id', requireAdmin, validate(partnerSchema), updatePartner)
router.delete('/:id', requireAdmin, deletePartner)

export default router


/**
 * @swagger
 * /api/partner:
 *   get:
 *     summary: Get all partners
 *     tags: [Partners]
 *     responses:
 *       200:
 *         description: List of partners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partner'
 *   post:
 *     summary: Create a new partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 minLength: 1
 *               position:
 *                 type: string
 *                 minLength: 1
 *               about:
 *                 type: string
 *                 minLength: 1
 *               biography:
 *                 type: string
 *                 minLength: 1
 *               image:
 *                 type: string
 *                 format: uri
 *               cover:
 *                 type: string
 *                 format: uri
 *               contact:
 *                 type: object
 *                 properties:
 *                   linkedin:
 *                     type: string
 *                     format: uri
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - fullname
 *               - position
 *               - about
 *               - biography
 *               - image
 *     responses:
 *       201:
 *         description: Created partner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/partner/{id}:
 *   get:
 *     summary: Get a partner by ID
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     responses:
 *       200:
 *         description: Partner details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 *       404:
 *         description: Partner not found
 *   put:
 *     summary: Update a partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 minLength: 1
 *               position:
 *                 type: string
 *                 minLength: 1
 *               about:
 *                 type: string
 *                 minLength: 1
 *               biography:
 *                 type: string
 *                 minLength: 1
 *               image:
 *                 type: string
 *                 format: uri
 *               cover:
 *                 type: string
 *                 format: uri
 *               contact:
 *                 type: object
 *                 properties:
 *                   linkedin:
 *                     type: string
 *                     format: uri
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - fullname
 *               - position
 *               - about
 *               - biography
 *               - image
 *     responses:
 *       200:
 *         description: Updated partner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Partner not found
 *   delete:
 *     summary: Delete a partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     responses:
 *       200:
 *         description: Partner deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Partner not found
 */