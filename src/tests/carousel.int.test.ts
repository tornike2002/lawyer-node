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

describe('Carousel API', () => {
  let id: string

  it('should create a carousel item', async () => {
    const res = await request(app).post('/api/carousel').set('Cookie', `accessToken=${token}`).send({
      title: 'Test Carousel',
      subtitle: 'Test Subtitle',
      image: 'https://via.placeholder.com/150',
      link1: 'https://www.google.com',
      link2: 'https://www.google.com',
    })

    expect(res.status).toBe(201)
    id = res.body.data._id
  })

  it('should get all carousel items', async () => {
    const res = await request(app).get('/api/carousel')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.message).toBe('Carousel fetched successfully')
  })

  it('should update a carousel item', async () => {
    const res = await request(app).put(`/api/carousel/${id}`).set('Cookie', `accessToken=${token}`).send({
      title: 'Updated Carousel',
      subtitle: 'Updated Subtitle',
      image: 'https://via.placeholder.com/150',
      link1: 'https://www.google.com',
      link2: 'https://www.google.com',
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Carousel updated successfully')
    expect(res.body.data.title).toBe('Updated Carousel')
    expect(res.body.data.subtitle).toBe('Updated Subtitle')
  })

  it('should delete a carousel item', async () => {
    const res = await request(app).delete(`/api/carousel/${id}`).set('Cookie', `accessToken=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Item deleted successfully')
  })
})