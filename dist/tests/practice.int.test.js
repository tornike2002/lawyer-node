"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const createTestAdmin_1 = require("./utils/createTestAdmin");
const mongoose_1 = __importDefault(require("mongoose"));
let token;
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
    const admin = await (0, createTestAdmin_1.createTestAdmin)();
    token = admin.token;
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Practice API', () => {
    let id;
    it('should create a practice', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/practice').set('Cookie', `accessToken=${token}`).send({
            position: 'Test Position',
            image: 'https://example.com/image.jpg',
            title: 'Test Practice',
            description: 'Test Description',
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Practice created successfully');
        id = res.body.practice._id;
    });
    it('should get all practices', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/practice');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Practice fetched successfully');
        expect(Array.isArray(res.body.practice)).toBe(true);
    });
    it('should get a practice by id', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/practice/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Practice fetched successfully');
        expect(res.body.practice._id).toBe(id);
        expect(typeof res.body.practice).toBe('object');
        expect(Array.isArray(res.body.practice)).toBe(false);
    });
    it('should update a practice', async () => {
        const res = await (0, supertest_1.default)(server_1.default).put(`/api/practice/${id}`).set('Cookie', `accessToken=${token}`).send({
            position: 'Updated Position',
            image: 'https://example.com/updated-image.jpg',
            title: 'Updated Practice',
            description: 'Updated Description',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Practice updated successfully');
    });
    it('should delete a practice', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/practice/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Practice deleted successfully');
    });
});
