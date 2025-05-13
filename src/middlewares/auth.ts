import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
interface JWTPayload {
  id: string
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    ;(req as any).user = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
