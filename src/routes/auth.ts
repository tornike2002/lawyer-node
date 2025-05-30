import Router from 'express'
import { register, login, logout, refreshToken, me } from '../controllers/auth'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../validators/auth'
import { requireAdmin } from '../middlewares/auth'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)

// private
router.get('/me', requireAdmin, me)

export default router
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current admin profile
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6074a2d8ccd6b74ad8b7fb72
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: admin@example.com
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Validation error
 *
 * /api/auth/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Invalid credentials
 *
 * /api/auth/logout:
 *   post:
 *     summary: Logout admin
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Admin logged out successfully
 *
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Uses refresh token cookie to generate new access token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized - No refresh token provided
 *       403:
 *         description: Forbidden - Invalid refresh token
 */