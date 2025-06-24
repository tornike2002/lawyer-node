"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.disconnect();
});
describe('Auth API', () => {
    const testEmail = 'test@test.com';
    const testPassword = 'test123';
    it('should register an Admin', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/auth/register')
            .send({ email: testEmail, password: testPassword });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Admin registered successfully');
        expect(res.headers['set-cookie']).toBeDefined();
    });
    it('should login an Admin', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/login').send({
            email: testEmail,
            password: testPassword,
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Admin logged in successfully');
    });
    it('should not log in with invalid credentials', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/login').send({
            email: testEmail,
            password: 'wrongPassword',
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
    it('should logout an Admin', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/logout');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Admin logged out successfully');
    });
});
