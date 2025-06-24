"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../server"));
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
describe('Banners API', () => {
    let id;
    it('should create banners item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/banners').set('Cookie', `accessToken=${token}`).send({
            title: 'Test Banners',
            link: 'https://www.google.com',
            image: 'https://www.google.com',
            revenue: 'revenue',
        });
        expect(res.status).toBe(201);
        id = res.body.data._id;
    });
    it('should get all banners item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/banners`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
    it('should update a banners item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).put(`/api/banners/${id}`).set('Cookie', `accessToken=${token}`).send({
            title: 'Test Banners',
            link: 'https://www.google.com',
            image: 'https://www.google.com',
            revenue: 'revenue',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Banners updated successfully');
        expect(res.body.data.title).toBe('Test Banners');
        expect(res.body.data.link).toBe('https://www.google.com');
        expect(res.body.data.image).toBe('https://www.google.com');
        expect(res.body.data.revenue).toBe('revenue');
    });
    it('should delete banners item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/banners/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Banner item deleted successfully');
    });
});
