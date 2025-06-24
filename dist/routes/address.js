"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_1 = require("../controllers/address");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const address_2 = require("../validators/address");
const router = (0, express_1.Router)();
// public routes
router.get('/', address_1.getAddress);
// admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(address_2.addressSchema), address_1.createAddress);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(address_2.addressSchema), address_1.updateAddress);
router.delete('/:id', auth_1.requireAdmin, address_1.deleteAddress);
exports.default = router;
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
