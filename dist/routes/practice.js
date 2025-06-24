"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const practice_1 = require("../controllers/practice");
const validate_1 = require("../middlewares/validate");
const practice_2 = require("../validators/practice");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// public
router.get('/', practice_1.getPractice);
router.get('/:id', practice_1.getPracticeById);
// admin
router.post('/', auth_1.requireAdmin, (0, validate_1.validate)(practice_2.practiceSchema), practice_1.createPractice);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(practice_2.practiceSchema), practice_1.updatePractice);
router.delete('/:id', auth_1.requireAdmin, practice_1.deletePractice);
exports.default = router;
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
 *           type: string
 *           format: url
 *         title:
 *           type: string
 *           minLength: 3
 *         description:
 *           type: string
 *           minLength: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
