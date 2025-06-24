"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const banners_1 = require("../validators/banners");
const banners_2 = require("../controllers/banners");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// public routes
router.get('/', banners_2.getAllBanners);
// admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(banners_1.bannersSchema), banners_2.createBanners);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(banners_1.bannersSchema), banners_2.updateBanners);
router.delete('/:id', auth_1.requireAdmin, banners_2.deleteBanners);
exports.default = router;
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
