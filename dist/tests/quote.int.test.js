"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const createTestAdmin_1 = require("./utils/createTestAdmin");
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
describe('Quote Carousel API', () => {
    let id;
    it('should create quote item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/quotes').set('Cookie', `accessToken=${token}`).send({
            quote: 'test quote',
            rating: 2.5,
            fullname: 'test name',
            position: 'test position',
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Quote Item created successfully');
        id = res.body.data._id;
    });
    it('should get all quote item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/quotes');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe('Quote Items fetched successfully');
    });
    it('should update quote item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).put(`/api/quotes/${id}`).set('Cookie', `accessToken=${token}`).send({
            quote: 'test quote',
            rating: 2.5,
            fullname: 'test name',
            position: 'test position',
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Quote Item updated successfully');
        expect(res.body.data.quote).toBe('test quote');
        expect(res.body.data.rating).toBe(2.5);
        expect(res.body.data.fullname).toBe('test name');
        expect(res.body.data.position).toBe('test position');
    });
    it('should delete quote item', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/quotes/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Quote Item deleted Successfully');
    });
});
