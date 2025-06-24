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
describe('Business API', () => {
    let id;
    it('should create a business', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/business').set('Cookie', `accessToken=${token}`).send({
            icon: 'https://example.com/icon.png',
            image: 'https://example.com/image.png',
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Business created successfully');
        id = res.body.data._id;
    });
    it('should get all businesses', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/business');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Businesses fetched successfully');
    });
    it('should update a business', async () => {
        const res = await (0, supertest_1.default)(server_1.default).put(`/api/business/${id}`).set('Cookie', `accessToken=${token}`).send({
            icon: 'https://example.com/icon.png',
            image: 'https://example.com/image.png',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Business updated successfully');
    });
    it('should delete a business', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/business/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Business deleted successfully');
    });
});
