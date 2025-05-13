import app from '../server'
import mongoose from 'mongoose'
import request from 'supertest'
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

describe('Tags API', () => {
  let tagId: string

  it('should create a new tag', async () => {
    const response = await request(app)
      .post('/api/tags')
      .set('Cookie', `accessToken=${token}`)
      .send({ name: 'Test Tag' })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Tag created successfully')
    expect(response.body.data.name).toBe('Test Tag')
    tagId = response.body.data._id
  })

  it('should get all tags', async () => {
    const response = await request(app).get('/api/tags')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Tags fetched successfully')
    expect(response.body.data.length).toBeGreaterThan(0)
  })

  it('should update a tag', async () => {
    const response = await request(app)
      .put(`/api/tags/${tagId}`)
      .set('Cookie', `accessToken=${token}`)
      .send({ name: 'Updated Tag' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Tag updated successfully')
    expect(response.body.data.name).toBe('Updated Tag')
  })

  it('should delete a tag', async () => {
    const response = await request(app).delete(`/api/tags/${tagId}`).set('Cookie', `accessToken=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Tag deleted successfully')
  })
})
