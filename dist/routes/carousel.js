"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const carousel_1 = require("../validators/carousel");
const carousel_2 = require("../controllers/carousel");
const router = (0, express_1.Router)();
// public routes
router.get('/', carousel_2.getAllCarousel);
// admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(carousel_1.carouselSchema), carousel_2.createCarousel);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(carousel_1.carouselSchema), carousel_2.updateCarousel);
router.delete('/:id', auth_1.requireAdmin, carousel_2.deleteCarouselItem);
exports.default = router;
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
 *         subtitle:
 *           type: string
 *         image:
 *           type: string
 *         link1:
 *           type: string
 *         link2:
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
 *         - subtitle
 *         - image
 *       properties:
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         image:
 *           type: string
 *         link1:
 *           type: string
 *         link2:
 *           type: string
 */
