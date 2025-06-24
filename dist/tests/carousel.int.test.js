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
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
    const res = await (0, createTestAdmin_1.createTestAdmin)();
    token = res.token;
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Carousel API', () => {
    let id;
    it('should create a carousel item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/carousel').set('Cookie', `accessToken=${token}`).send({
            title: 'Test Carousel',
            subtitle: 'Test Subtitle',
            image: 'https://via.placeholder.com/150',
            link1: 'https://www.google.com',
            link2: 'https://www.google.com',
        });
        expect(res.status).toBe(201);
        id = res.body.data._id;
    });
    it('should get all carousel items', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/carousel');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe('Carousel fetched successfully');
    });
    it('should update a carousel item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).put(`/api/carousel/${id}`).set('Cookie', `accessToken=${token}`).send({
            title: 'Updated Carousel',
            subtitle: 'Updated Subtitle',
            image: 'https://via.placeholder.com/150',
            link1: 'https://www.google.com',
            link2: 'https://www.google.com',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Carousel updated successfully');
        expect(res.body.data.title).toBe('Updated Carousel');
        expect(res.body.data.subtitle).toBe('Updated Subtitle');
    });
    it('should delete a carousel item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/carousel/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Item deleted successfully');
    });
});
