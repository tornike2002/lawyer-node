"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = __importDefault(require("../models/Admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let refreshToken;
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.TESTIN_MONGO_URL);
    const password = await bcryptjs_1.default.hash('password', 10);
    const admin = await Admin_1.default.create({
        email: 'test@test.com',
        password,
    });
    refreshToken = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    admin.refreshToken = refreshToken;
    await admin.save();
});
afterAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Refresh Token', () => {
    it('should refresh the token', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/auth/refresh-token')
            .set('Cookie', `refreshToken=${refreshToken}`)
            .expect(200);
        expect(res.body.message).toBe('Token refreshed');
    });
    it('should return 401 if no refresh token is provided', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/refresh-token').expect(401);
        expect(res.body.message).toBe('Unauthorized');
    });
    it('should return 401 if refresh token is invalid', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/auth/refresh-token')
            .set('Cookie', `refreshToken=invalid`)
            .expect(401);
        expect(res.body.message).toBe('Unauthorized');
    });
    it('should fail refresh if refresh token is not matching db', async () => {
        const fakeToken = jsonwebtoken_1.default.sign({ id: new mongoose_1.default.Types.ObjectId() }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        });
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/auth/refresh-token')
            .set('Cookie', `refreshToken=${fakeToken}`)
            .expect(403);
        expect(res.body.message).toBe('Refresh token is invalid');
    });
});
