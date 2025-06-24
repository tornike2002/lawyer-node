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
describe('FAQ API', () => {
    let id;
    it('should create a new FAQ', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/faq')
            .set('Cookie', `accessToken=${token}`)
            .send({ question: 'What is the capital of France?', answer: 'Paris' });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Faq created successfully');
        id = res.body.faq._id;
    });
    it('should get all FAQs', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/faq');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Faqs fetched successfully');
        expect(Array.isArray(res.body.faqs)).toBe(true);
    });
    it('should update a FAQ', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/faq/${id}`)
            .set('Cookie', `accessToken=${token}`)
            .send({ question: 'What is the capital of France?', answer: 'Paris' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Faq updated successfully');
    });
    it('should delete a FAQ', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/faq/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Faq deleted successfully');
    });
});
