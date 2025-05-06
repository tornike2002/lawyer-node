import { Router } from 'express'
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blog'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { updateBlogSchema, createBlogSchema } from '../validators/blog'

const router = Router()

// public routes
router.get('/', getAllBlogs)
router.get('/:slug', getBlogBySlug)

// admin routes
router.post('/', requireAdmin, validate(createBlogSchema), createBlog)
router.put('/:id', requireAdmin, validate(updateBlogSchema), updateBlog)
router.delete('/:id', requireAdmin, deleteBlog)

export default router

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management endpoints
 *
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter blogs by category
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter blogs by tags (comma separated)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for blogs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *                 message:
 *                   type: string
 *
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Invalid input or blog already exists
 *       401:
 *         description: Unauthorized
 *
 * /blogs/{slug}:
 *   get:
 *     summary: Get a blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog slug
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 *
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBlog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 *
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         subTitle:
 *           type: string
 *         slug:
 *           type: string
 *         content:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         author:
 *           type: string
 *         share:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *             linkedin:
 *               type: string
 *             x:
 *               type: string
 *             instagram:
 *               type: string
 *         lawWays:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateBlog:
 *       type: object
 *       required:
 *         - title
 *         - slug
 *         - content
 *         - images
 *         - category
 *         - tags
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *         subTitle:
 *           type: string
 *           minLength: 3
 *         slug:
 *           type: string
 *           minLength: 3
 *         content:
 *           type: string
 *           minLength: 10
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         category:
 *           type: string
 *           minLength: 3
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *         author:
 *           type: string
 *           minLength: 3
 *         share:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *               format: uri
 *             linkedin:
 *               type: string
 *               format: uri
 *             x:
 *               type: string
 *               format: uri
 *             instagram:
 *               type: string
 *               format: uri
 *         lawWays:
 *           type: string
 *           minLength: 3
 *
 *     UpdateBlog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *         subTitle:
 *           type: string
 *           minLength: 3
 *         slug:
 *           type: string
 *           minLength: 3
 *         content:
 *           type: string
 *           minLength: 10
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         category:
 *           type: string
 *           minLength: 3
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *         author:
 *           type: string
 *           minLength: 3
 *         share:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *               format: uri
 *             linkedin:
 *               type: string
 *               format: uri
 *             x:
 *               type: string
 *               format: uri
 *             instagram:
 *               type: string
 *               format: uri
 *         lawWays:
 *           type: string
 *           minLength: 3
 */
