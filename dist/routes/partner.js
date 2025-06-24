"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const partner_1 = require("../validators/partner");
const auth_1 = require("../middlewares/auth");
const partner_2 = require("../controllers/partner");
const router = (0, express_1.Router)();
// public
router.get('/', partner_2.getAllPartners);
router.get('/:id', partner_2.getPartnerById);
// admin
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(partner_1.partnerSchema), partner_2.createPartner);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(partner_1.partnerSchema), partner_2.updatePartner);
router.delete('/:id', auth_1.requireAdmin, partner_2.deletePartner);
exports.default = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullname:
 *           type: string
 *           minLength: 1
 *         position:
 *           type: string
 *           minLength: 1
 *         about:
 *           type: string
 *           minLength: 1
 *         biography:
 *           type: string
 *           minLength: 1
 *         image:
 *           type: string
 *           format: uri
 *         cover:
 *           type: string
 *           format: uri
 *         contact:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *               format: uri
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *         services:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - fullname
 *         - position
 *         - about
 *         - biography
 *         - image
 *
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
