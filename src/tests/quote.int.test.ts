import request from 'supertest'
import { createTestAdmin } from './utils/createTestAdmin'
import app from '../server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

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

describe('Quote Carousel API', () => {
  let id: string

  it('should create quote item', async () => {
    const res = await request(app).post('/api/quotes').set('Cookie', `accessToken=${token}`).send({
      quote: 'test quote',
      rating: 2.5,
      fullname: 'test name',
      position: 'test position',
    })
    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Quote Item created successfully')
    id = res.body.data._id
  })
  
  it('should get all quote item', async () => {
    const res = await request(app).get('/api/quotes')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.message).toBe('Quote Items fetched successfully')
  })
  it('should update quote item', async () => {
    const res = await request(app).put(`/api/quotes/${id}`).set('Cookie', `accessToken=${token}`).send({
      quote: 'test quote',
      rating: 2.5,
      fullname: 'test name',
      position: 'test position',
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Quote Item updated successfully')
    expect(res.body.data.quote).toBe('test quote')
    expect(res.body.data.rating).toBe(2.5)
    expect(res.body.data.fullname).toBe('test name')
    expect(res.body.data.position).toBe('test position')
  })

  it('should delete quote item', async () => {
    const res = await request(app).delete(`/api/quotes/${id}`).set('Cookie', `accessToken=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Quote Item deleted Successfully')
  })
})