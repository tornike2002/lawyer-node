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

describe('Category API', () => {
  let id: string
  it('should create a new category', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', `accessToken=${token}`)
      .send({ name: 'Test Category' })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Category created successfully')
    expect(response.body.data.name).toBe('Test Category')
    id = response.body.data._id
  })

  it('should get all categories', async () => {
    const response = await request(app).get('/api/categories')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Categories fetched successfully')
    expect(response.body.data.length).toBeGreaterThan(0)
  })

  it('should update a category', async () => {
    const response = await request(app)
      .put(`/api/categories/${id}`)
      .set('Cookie', `accessToken=${token}`)
      .send({ name: 'Updated Category' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Category updated successfully')
    expect(response.body.data.name).toBe('Updated Category')
  })

  it('should delete a category', async () => {
    const response = await request(app)
      .delete(`/api/categories/${id}`)
      .set('Cookie', `accessToken=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Category deleted successfully')
  })
})
