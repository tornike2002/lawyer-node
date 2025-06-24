"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const createTestAdmin_1 = require("./utils/createTestAdmin");
const Blog_1 = __importDefault(require("../models/Blog"));
const mongoose_1 = __importDefault(require("mongoose"));
let token;
let blogId;
let commentId;
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
    const admin = await (0, createTestAdmin_1.createTestAdmin)();
    token = admin.token;
    const blog = await Blog_1.default.create({
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
    });
    blogId = blog._id.toString();
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Comment API', () => {
    it('should create a top-level comment', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post(`/api/comment/${blogId}`)
            .set('Cookie', `accessToken=${token}`)
            .send({
            name: 'Test User',
            email: 'test@example.com',
            content: 'This is a test comment',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Comment created successfully');
        expect(response.body.comment._id).toBeDefined();
        expect(response.body.comment.name).toBe('Test User');
        expect(response.body.comment.email).toBe('test@example.com');
        expect(response.body.comment.content).toBe('This is a test comment');
        expect(response.body.comment.blogId).toBe(blogId);
        commentId = response.body.comment._id;
    });
    it('should reply to a public comment', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(`/api/comment/${blogId}`)
            .set('Cookie', `accessToken=${token}`)
            .send({
            name: 'Test User',
            email: 'test@example.com',
            content: 'This is a test reply',
            parentId: commentId,
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Comment created successfully');
        expect(res.body.comment._id).toBeDefined();
        expect(res.body.comment.name).toBe('Test User');
        expect(res.body.comment.email).toBe('test@example.com');
    });
    it('should get all comments for a blog', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/comment/${blogId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Comments fetched successfully');
        expect(res.body.result.length).toBeGreaterThan(0);
    });
    it('should delete a comment', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete(`/api/comment/delete/${commentId}`)
            .set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Comment deleted successfully');
        const check = await (0, supertest_1.default)(server_1.default).get(`/api/comment/${blogId}`);
        const deleted = check.body.result.find((c) => c._id === commentId);
        expect(deleted).toBeUndefined();
    });
});
