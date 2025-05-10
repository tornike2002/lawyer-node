import { Router } from 'express'
import { createComment, deleteComment, getCommentsByBlog } from '../controllers/comment'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { createCommentSchema } from '../validators/comment'

const router = Router()

// public routes
router.post('/:blogId', validate(createCommentSchema), createComment)
router.get('/:blogId', getCommentsByBlog)

// admin routes
router.delete('/delete/:commentId', requireAdmin, deleteComment)

export default router

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
