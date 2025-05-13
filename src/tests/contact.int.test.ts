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
  await mongoose.connection.db?.dropDatabase()
  await mongoose.connection.close()
})

describe('Contact API', () => {
  let id: string

  it('should create a contact', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Cookie', `token=${token}`)
      .send({ name: 'John Doe', email: 'john@doe.com', message: 'Hello, world!' })
    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Contact created successfully')
    id = res.body.contact._id
  })

  it('should get all contacts', async () => {
    const res = await request(app).get('/api/contact').set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Contacts fetched successfully')
  })

  it('should update a contact', async () => {
    const res = await request(app)
      .put(`/api/contact/${id}`)
      .set('Cookie', `token=${token}`)
      .send({ name: 'John Doe', email: 'john@doe.com', message: 'Hello, world!' })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Contact updated successfully')
  })

  it('should delete a contact', async () => {
    const res = await request(app).delete(`/api/contact/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Contact deleted successfully')
  })
})
