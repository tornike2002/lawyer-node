import request from 'supertest'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import mongoose from 'mongoose'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Address API', () => {
  let id: string

  it('should create a new address', async () => {
    const response = await request(app).post('/api/address').set('Cookie', `token=${token}`).send({
      city: 'Test City',
      street: 'Test Street',
      phone: '1234567890',
      email: 'test@test.com',
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Address created successfully')
    id = response.body.address._id
  })

  it('should get all addresses', async () => {
    const response = await request(app).get('/api/address')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Address fetched successfully')
  })

  it('should update an address', async () => {
    const response = await request(app)
      .put(`/api/address/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        city: 'Updated City',
        street: 'Test Street',
        phone: '1234567890',
        email: 'test@test.com'
      })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Address updated successfully')
  })

  it('should delete an address', async () => {
    const response = await request(app).delete(`/api/address/${id}`).set('Cookie', `token=${token}`)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Address deleted successfully')
  })
})
