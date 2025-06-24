"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const faq_1 = require("../controllers/faq");
const faq_2 = require("../validators/faq");
const router = (0, express_1.Router)();
//public routes
router.get('/', faq_1.getFaqs);
//admin routes
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(faq_2.faqSchema), faq_1.createFaq);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(faq_2.faqSchema), faq_1.updateFaq);
router.delete('/:id', auth_1.requireAdmin, faq_1.deleteFaq);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: FAQ management endpoints
 *
 * /api/faq:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQs]
 *     responses:
 *       200:
 *         description: List of all FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 faqs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *
 * /api/faq/{id}:
 *   put:
 *     summary: Update a FAQ
 *     tags: [FAQs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 *
 *   delete:
 *     summary: Delete a FAQ
 *     tags: [FAQs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ ID
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 */
