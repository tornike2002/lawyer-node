import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API',
      version: '1.0.0',
      description: 'API for Admin operations',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-app.vercel.app'
          : 'http://localhost:4000',
        description: process.env.NODE_ENV === 'production' 
          ? 'Production'
          : 'Local Development',
      },
    ],
  },
  apis: process.env.NODE_ENV === 'production' 
    ? [] // Skip file scanning in production
    : ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log('Swagger UI is running on http://localhost:4000/api-docs')
}
