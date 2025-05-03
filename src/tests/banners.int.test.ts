import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server'
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

describe('Banners API', () => {
  let id: string

  it('should create banners item', async () => {
    const res = await request(app)
      .post(`/api/banners/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Banners',
        description: 'Test Description',
        banners: {
          left: {
            title: 'Left title',
            link: 'https://www.google.com',
          },
          right: {
            title: 'Right title',
            link: 'https://www.google.com',
            revenue: '800k',
          },
        },
      })
    expect(res.status).toBe(201)
    id = res.body._id
  })

  it('should get all banners item', async () => {
    const res = await request(app).get(`/api/banners/${id}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should update a banners item', async () => {
    const res = await request(app)
      .put(`/api/banners/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Banners',
        description: 'Test Description',
        banners: {
          left: {
            title: 'Left title',
            link: 'https://www.google.com',
          },
          right: {
            title: 'Right title',
            link: 'https://www.google.com',
            revenue: '800k',
          },
        },
      })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Test Banners')
    expect(res.body.description).toBe('Test Description')
    expect(res.body.banners.left.title).toBe('Left title')
    expect(res.body.banners.left.link).toBe('https://www.google.com')
    expect(res.body.banners.right.title).toBe('Right title')
    expect(res.body.banners.right.link).toBe('https://www.google.com')
    expect(res.body.banners.right.revenue).toBe('800k')
  })

  it('should delete banners item', async () => {
    const res = await request(app).delete(`/api/banners/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message("Banner item deleted successfully"))
  })
})
