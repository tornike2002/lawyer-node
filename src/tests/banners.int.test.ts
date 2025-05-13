import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server'
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

describe('Banners API', () => {
  let id: string

  it('should create banners item', async () => {
    const res = await request(app).post('/api/banners').set('Cookie', `token=${token}`).send({
      title: 'Test Banners',
      link: 'https://www.google.com',
      image: 'https://www.google.com',
      revenue: 'revenue',
    })
    expect(res.status).toBe(201)
    id = res.body.data._id
  })

  it('should get all banners item', async () => {
    const res = await request(app).get(`/api/banners`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should update a banners item', async () => {
    const res = await request(app).put(`/api/banners/${id}`).set('Cookie', `token=${token}`).send({
      title: 'Test Banners',
      link: 'https://www.google.com',
      image: 'https://www.google.com',
      revenue: 'revenue',
    })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Banners updated successfully')
    expect(res.body.data.title).toBe('Test Banners')
    expect(res.body.data.link).toBe('https://www.google.com')
    expect(res.body.data.image).toBe('https://www.google.com')
    expect(res.body.data.revenue).toBe('revenue')
  })

  it('should delete banners item', async () => {
    const res = await request(app).delete(`/api/banners/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Banner item deleted successfully')
  })
})