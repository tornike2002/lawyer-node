"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTestAdmin_1 = require("./utils/createTestAdmin");
let token;
let blogId;
let slug;
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
    const admin = await (0, createTestAdmin_1.createTestAdmin)();
    token = admin.token;
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Blog API', () => {
    it('should create a new blog', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/api/blogs')
            .set('Cookie', `accessToken=${token}`)
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
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Blog created successfully');
        expect(response.body.data.title).toBe('Test Blog');
        expect(response.body.data.slug).toBeDefined();
        blogId = response.body.data._id;
        slug = response.body.data.slug;
    });
    it('should get all blogs', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/api/blogs');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blogs fetched successfully');
        expect(response.body.data.length).toBeGreaterThan(0);
    });
    it('should get a blog by slug', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/api/blogs/${slug}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog fetched successfully');
        expect(response.body.data.title).toBe('Test Blog');
        expect(response.body.data.slug).toBe(slug);
    });
    it('should get latest blogs', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/api/blogs/latest');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Latest blogs fetched successfully');
        expect(response.body.data.length).toBeGreaterThan(0);
    });
    it('should update a blog', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .put(`/api/blogs/${blogId}`)
            .set('Cookie', `accessToken=${token}`)
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
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog updated successfully');
        expect(response.body.data.title).toBe('Updated Blog');
        expect(response.body.data.slug).toBe('updated-blog');
    });
    it('should delete a blog', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .delete(`/api/blogs/${blogId}`)
            .set('Cookie', `accessToken=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog deleted successfully');
    });
});
