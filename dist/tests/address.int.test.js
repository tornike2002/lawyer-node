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
describe('Address API', () => {
    let id;
    it('should create a new address', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/api/address')
            .set('Cookie', `accessToken=${token}`)
            .send({
            city: 'Test City',
            street: 'Test Street',
            phone: '1234567890',
            email: 'test@test.com',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Address created successfully');
        id = response.body.address._id;
    });
    it('should get all addresses', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/api/address');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Address fetched successfully');
    });
    it('should update an address', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .put(`/api/address/${id}`)
            .set('Cookie', `accessToken=${token}`)
            .send({
            city: 'Updated City',
            street: 'Test Street',
            phone: '1234567890',
            email: 'test@test.com'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Address updated successfully');
    });
    it('should delete an address', async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete(`/api/address/${id}`).set('Cookie', `accessToken=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Address deleted successfully');
    });
});
