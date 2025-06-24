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
describe('Category API', () => {
    let id;
    it('should create a new category', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/api/categories')
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'Test Category' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Category created successfully');
        expect(response.body.data.name).toBe('Test Category');
        id = response.body.data._id;
    });
    it('should get all categories', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/api/categories');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Categories fetched successfully');
        expect(response.body.data.length).toBeGreaterThan(0);
    });
    it('should update a category', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .put(`/api/categories/${id}`)
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'Updated Category' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Category updated successfully');
        expect(response.body.data.name).toBe('Updated Category');
    });
    it('should delete a category', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .delete(`/api/categories/${id}`)
            .set('Cookie', `accessToken=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Category deleted successfully');
    });
});
