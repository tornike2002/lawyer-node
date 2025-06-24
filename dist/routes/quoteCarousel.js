"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const quoteCarousel_1 = require("../validators/quoteCarousel");
const quoteCarousel_2 = require("../controllers/quoteCarousel");
const router = (0, express_1.Router)();
// public routes
router.get('/', quoteCarousel_2.getAllQuoteItems);
// admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(quoteCarousel_1.quoteCarouselSchema), quoteCarousel_2.createQuoteItem);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(quoteCarousel_1.quoteCarouselSchema), quoteCarousel_2.updateQuoteItem);
router.delete('/:id', auth_1.requireAdmin, quoteCarousel_2.deleteQuoteItem);
exports.default = router;
/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Get all quote carousel items
 *     tags: [Quotes]
 *     responses:
 *       200:
 *         description: List of quote carousel items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   quote:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   fullname:
 *                     type: string
 *                   position:
 *                     type: string
 *   post:
 *     summary: Create a new quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quote
 *               - rating
 *               - fullname
 *               - position
 *             properties:
 *               quote:
 *                 type: string
 *               rating:
 *                 type: number
 *               fullname:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quote carousel item created successfully
 *       401:
 *         description: Unauthorized
 *
 * /api/quotes/{id}:
 *   put:
 *     summary: Update a quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
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
 *             type: object
 *             required:
 *               - quote
 *               - rating
 *               - fullname
 *               - position
 *             properties:
 *               quote:
 *                 type: string
 *               rating:
 *                 type: number
 *               fullname:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quote carousel item updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote carousel item not found
 *   delete:
 *     summary: Delete a quote carousel item
 *     tags: [Quotes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quote carousel item deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote carousel item not found
 */
