import request from 'supertest'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import Blog from '../models/Blog'
import mongoose from 'mongoose'

let token: string
let blogId: string
let commentId: string

beforeAll(async () => {
  await mongoose.connect(process.env.TESTIN_MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token

  const blog = await Blog.create({
    title: 'Test Blog',
    subTitle: 'A subtitle for testing',
    content: 'This is a test blog with at least 10 characters',
    author: 'Test Author',
    category: 'Test Category',
    tags: ['test', 'blog'],
    slug: 'test-blog',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    share: {
      facebook: 'https://facebook.com/testblog',
      linkedin: 'https://linkedin.com/in/testblog',
      x: 'https://x.com/testblog',
    },
    lawWays: 'Test Law Ways',
  })

  blogId = blog._id.toString()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Comment API', () => {
  it('should create a top-level comment', async () => {
    const response = await request(app)
      .post(`/api/comment/${blogId}`)
      .set('Cookie', `token=${token}`)
      .send({
        name: 'Test User',
        email: 'test@example.com',
        content: 'This is a test comment',
      })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Comment created successfully')
    expect(response.body.comment._id).toBeDefined()
    expect(response.body.comment.name).toBe('Test User')
    expect(response.body.comment.email).toBe('test@example.com')
    expect(response.body.comment.content).toBe('This is a test comment')
    expect(response.body.comment.blogId).toBe(blogId)
    commentId = response.body.comment._id
  })

  it('should reply to a public comment', async () => {
    const res = await request(app)
      .post(`/api/comment/${blogId}`)
      .set('Cookie', `token=${token}`)
      .send({
        name: 'Test User',
        email: 'test@example.com',
        content: 'This is a test reply',
        parentId: commentId,
      })

    expect(res.status).toBe(201)
    expect(res.body.message).toBe('Comment created successfully')
    expect(res.body.comment._id).toBeDefined()
    expect(res.body.comment.name).toBe('Test User')
    expect(res.body.comment.email).toBe('test@example.com')
  })

  it('should get all comments for a blog', async () => {
    const res = await request(app).get(`/api/comment/${blogId}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Comments fetched successfully')
    expect(res.body.result.length).toBeGreaterThan(0)
  })

  it('should delete a comment', async () => {
    const res = await request(app)
      .delete(`/api/comment/delete/${commentId}`)
      .set('Cookie', `token=${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Comment deleted successfully')

    const check = await request(app).get(`/api/comment/${blogId}`)
    const deleted = check.body.result.find((c:any) => c._id === commentId)
    expect(deleted).toBeUndefined()
  })
})
