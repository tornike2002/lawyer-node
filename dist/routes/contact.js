"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const contact_1 = require("../controllers/contact");
const contact_2 = require("../validators/contact");
const router = (0, express_1.Router)();
//public routes
router.post('/', (0, validate_1.validate)(contact_2.contactSchema), contact_1.createContact);
//admin routes
router.get('/', auth_1.requireAdmin, contact_1.getContacts);
router.put('/:id', auth_1.requireAdmin, (0, validate_1.validate)(contact_2.contactSchema), contact_1.updateContact);
router.delete('/:id', auth_1.requireAdmin, contact_1.deleteContact);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management endpoints
 *
 * /api/contact:
 *   post:
 *     summary: Create a new contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input data
 *
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all contacts
 *       401:
 *         description: Unauthorized - Admin access required
 *
 * /api/contact/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Contact not found
 *
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Contact not found
 */
