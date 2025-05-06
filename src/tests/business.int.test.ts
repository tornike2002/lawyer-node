import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Business API', () => {
  let id: string

  it('should create a business', async () => {
    const res = await request(app).post('/api/business').set('Cookie', `token=${token}`).send({
      icon: 'https://example.com/icon.png',
      image: 'https://example.com/image.png',
    })
    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Business created successfully')
    id = res.body.data._id
  })

  it('should get all businesses', async () => {
    const res = await request(app).get('/api/business')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Businesses fetched successfully')
  })

  it('should update a business', async () => {
    const res = await request(app).put(`/api/business/${id}`).set('Cookie', `token=${token}`).send({
      icon: 'https://example.com/icon.png',
      image: 'https://example.com/image.png',
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Business updated successfully')
  })

  it('should delete a business', async () => {
    const res = await request(app).delete(`/api/business/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Business deleted successfully')
  })
})
