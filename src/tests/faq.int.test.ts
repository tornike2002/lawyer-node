import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string
beforeAll(async () => {
  await mongoose.connect(process.env.TESTIN_MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('FAQ API', () => {
  let id: string

  it('should create a new FAQ', async () => {
    const res = await request(app)
      .post('/api/faq')
      .set('Cookie', `accessToken=${token}`)
      .send({ question: 'What is the capital of France?', answer: 'Paris' })
    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Faq created successfully')
    id = res.body.faq._id
  })

  it('should get all FAQs', async () => {
    const res = await request(app).get('/api/faq')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Faqs fetched successfully')
    expect(Array.isArray(res.body.faqs)).toBe(true)
  })

  it('should update a FAQ', async () => {
    const res = await request(app)
      .put(`/api/faq/${id}`)
      .set('Cookie', `accessToken=${token}`)
      .send({ question: 'What is the capital of France?', answer: 'Paris' })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Faq updated successfully')
  })

  it('should delete a FAQ', async () => {
    const res = await request(app).delete(`/api/faq/${id}`).set('Cookie', `accessToken=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Faq deleted successfully')
  })
})
