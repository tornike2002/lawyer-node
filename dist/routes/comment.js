"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_1 = require("../controllers/comment");
const validate_1 = require("../middlewares/validate");
const auth_1 = require("../middlewares/auth");
const comment_2 = require("../validators/comment");
const router = (0, express_1.Router)();
// public routes
router.post('/:blogId', (0, validate_1.validate)(comment_2.createCommentSchema), comment_1.createComment);
router.get('/:blogId', comment_1.getCommentsByBlog);
// admin routes
router.delete('/delete/:commentId', auth_1.requireAdmin, comment_1.deleteComment);
exports.default = router;
/**
 * @swagger
 * /comments/{blogId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the commenter
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the commenter (optional)
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *               parentId:
 *                 type: string
 *                 description: ID of the parent comment for replies (optional)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   type: object
 *
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to get comments for
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       replies:
 *                         type: array
 *                         items:
 *                           type: object
 *
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Comment not found
 */
