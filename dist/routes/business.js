"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const business_1 = require("../validators/business");
const business_2 = require("../controllers/business");
const router = (0, express_1.Router)();
// public routes
router.get('/', business_2.getAllBusinesses);
// admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(business_1.createBusinessSchema), business_2.createBusiness);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(business_1.createBusinessSchema), business_2.updateBusiness);
router.delete('/:id', auth_1.requireAdmin, business_2.deleteBusiness);
exports.default = router;
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
