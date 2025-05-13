import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import { describe } from 'node:test'

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

describe('Partners API', () => {
  let id: string

  it('should get all partners', async () => {
    const res = await request(app).get('/api/partner')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.message).toBe('Partners fetched successfully')
  })

  it('should create partner', async () => {
    const partnerData = {
      fullname: 'test',
      position: 'test',
      about: 'about',
      biography: 'bio',
      image: 'https://www.google.com/',
      cover: 'https://www.google.com/',
      contact: {
        linkedin: 'https://www.google.com/',
        phone: '555223344',
        email: 'test@test.com',
      },
      services: [],
    }

    const res = await request(app)
      .post('/api/partner')
      .set('Cookie', `token=${token}`)
      .send(partnerData)

    expect(res.status).toBe(201)
    id = res.body.data._id
  })

  it('should get partner by id', async () => {
    const res = await request(app).get(`/api/partner/${id}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Partner fetched successfully')
    expect(res.body.data._id).toBe(id)
    expect(Array.isArray(res.body.data.services)).toBe(true)
  })

  it('should update partner', async () => {
    const res = await request(app)
      .put(`/api/partner/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
        fullname: 'test',
        position: 'test',
        about: 'about',
        biography: 'bioo',
        image: 'https://www.google.com/',
        cover: 'https://www.google.com/',
        contact: {
          linkedin: 'https://www.google.com/',
          phone: '555223344',
          email: 'test@test.com',
        },
        services: [],
      })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Partner updated successfully')
    expect(res.body.data.fullname).toBe('test')
    expect(res.body.data.position).toBe('test')
    expect(res.body.data.about).toBe('about')
    expect(res.body.data.biography).toBe('bioo')
    expect(res.body.data.image).toBe('https://www.google.com/')
    expect(res.body.data.cover).toBe('https://www.google.com/')
    expect(res.body.data.contact.linkedin).toBe('https://www.google.com/')
    expect(res.body.data.contact.phone).toBe('555223344')
    expect(res.body.data.contact.email).toBe('test@test.com')
  })

  it('should delete partner', async () => {
    if (!id) {
      const createRes = await request(app)
        .post('/api/partner')
        .set('Cookie', `token=${token}`)
        .send({
          fullname: 'test for delete',
          position: 'test',
          about: 'about',
          biography: 'bio',
          image: 'https://www.google.com/',
          cover: 'https://www.google.com/',
          contact: {
            linkedin: 'https://www.google.com/',
            phone: '555223344',
            email: 'test@test.com',
          },
          services: [],
        })
      id = createRes.body._id
    }

    const res = await request(app).delete(`/api/partner/${id}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Partner deleted successfully')
  })
})
