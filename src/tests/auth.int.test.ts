import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  const uniqueDbUrl = `${process.env.MONGO_URL as string}-auth-test`
  await mongoose.connect(uniqueDbUrl)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Auth API', () => {
  const testEmail = 'test-auth@test.com'
  const testPassword = 'test123'
  
  beforeEach(async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  
  it('should register an Admin', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Admin registered successfully')
    expect(res.headers['set-cookie']).toBeDefined()
  })

  it('should login an Admin', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Admin logged in successfully')
  })

  it('should not log in with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'wrongPassword',
    })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('should logout an Admin', async () => {
    const res = await request(app).post('/api/auth/logout')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Admin logged out successfully')
  })
})
