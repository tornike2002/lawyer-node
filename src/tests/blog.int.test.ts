import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'
import { z } from 'zod'

let token: string
let blogId: string
let slug: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})  

describe('Blog API', () => {

  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Blog',
        subTitle: 'Test Subtitle',
        slug: 'test-blog',
        content: 'This is a test blog',
        images: ['https://example.com/image.jpg'],
        category: 'Test Category',
        tags: ['test', 'blog'],
        author: 'Test Author',
        share: {
          facebook: 'https://www.facebook.com',
          linkedin: 'https://www.linkedin.com',
          x: 'https://www.x.com',
          instagram: 'https://www.instagram.com',
        },
        lawWays: 'Test Law Way',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Blog created successfully')
    expect(response.body.data.title).toBe('Test Blog')
    expect(response.body.data.slug).toBeDefined()
    blogId = response.body.data._id
    slug = response.body.data.slug
  })

  it('should get all blogs', async () => {
    const response = await request(app)
      .get('/api/blogs')    

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Blogs fetched successfully')
    expect(response.body.data.length).toBeGreaterThan(0)
  })


  it('should get a blog by slug', async () => {
    const response = await request(app)
      .get(`/api/blogs/${slug}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Blog fetched successfully') 
    expect(response.body.data.title).toBe('Test Blog')
    expect(response.body.data.slug).toBe(slug)
  })

  it('should update a blog', async () => {
    const response = await request(app) 
      .put(`/api/blogs/${blogId}`)
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Updated Blog',
        content: 'This is an updated blog',
        subTitle: 'Updated Subtitle',
        images: ['https://example.com/image.jpg'],
        slug: 'updated-blog',
        category: 'Updated Category',
        tags: ['updated', 'blog'],
        author: 'Updated Author',
        share: {
          facebook: 'https://www.facebook.com',
          linkedin: 'https://www.linkedin.com',
          x: 'https://www.x.com',
          instagram: 'https://www.instagram.com',
        },
        lawWays: 'Updated Law Way',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Blog updated successfully')
    expect(response.body.data.title).toBe('Updated Blog')
    expect(response.body.data.slug).toBe('updated-blog')
  })

  it('should delete a blog', async () => {
    const response = await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set('Cookie', `token=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Blog deleted successfully')
  })
})

