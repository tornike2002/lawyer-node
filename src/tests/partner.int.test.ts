import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import { describe } from 'node:test'

let token: string
beforeAll(async () => {
  const uniqueDbUrl = `${process.env.MONGO_URL!}-partner-test`
  await mongoose.connect(uniqueDbUrl)
  const resp = await createTestAdmin('-partner')
  token = resp.token
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
    expect(Array.isArray(res.body)).toBe(true)
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
    id = res.body._id
  })

  it('should update partner', async () => {
    if (!id) {
      const createRes = await request(app)
        .post('/api/partner')
        .set('Cookie', `token=${token}`)
        .send({
          fullname: 'test for update',
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
    
    const res = await request(app)
      .put(`/api/partner/${id}`)
      .set('Cookie', `token=${token}`)
      .send({
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
      })
    expect(res.status).toBe(200)
    expect(res.body.fullname).toBe('test')
    expect(res.body.position).toBe('test')
    expect(res.body.about).toBe('about')
    expect(res.body.biography).toBe('bio')
    expect(res.body.image).toBe('https://www.google.com/')
    expect(res.body.cover).toBe('https://www.google.com/')
    expect(res.body.contact.linkedin).toBe('https://www.google.com/')
    expect(res.body.contact.phone).toBe('555223344')
    expect(res.body.contact.email).toBe('test@test.com')
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
