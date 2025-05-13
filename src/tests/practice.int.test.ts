import request from 'supertest'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import mongoose from 'mongoose'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.TESTIN_MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Practice API', () => {
  let id: string

  it('should create a practice', async () => {
    const res = await request(app).post('/api/practice').set('Cookie', `token=${token}`).send({
      position: 'Test Position',
      image: 'https://example.com/image.jpg',
      title: 'Test Practice',
      description: 'Test Description',
    })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Practice created successfully')
    id = res.body.practice._id
  })

  it('should get all practices', async () => {
    const res = await request(app).get('/api/practice')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Practice fetched successfully')
    expect(Array.isArray(res.body.practice)).toBe(true)
  })

  it('should get a practice by id', async () => {
    const res = await request(app).get(`/api/practice/${id}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Practice fetched successfully')
    expect(res.body.practice._id).toBe(id)
    expect(typeof res.body.practice).toBe('object')
    expect(Array.isArray(res.body.practice)).toBe(false)
  })

  it('should update a practice', async () => {
    const res = await request(app).put(`/api/practice/${id}`).set('Cookie', `token=${token}`).send({
      position: 'Updated Position',
      image: 'https://example.com/updated-image.jpg',
      title: 'Updated Practice',
      description: 'Updated Description',
    })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Practice updated successfully')
  })

  it('should delete a practice', async () => {
    const res = await request(app).delete(`/api/practice/${id}`).set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Practice deleted successfully')
  })
})
