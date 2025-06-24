"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
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
describe('Tags API', () => {
    let tagId;
    it('should create a new tag', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/api/tags')
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'Test Tag' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Tag created successfully');
        expect(response.body.data.name).toBe('Test Tag');
        tagId = response.body.data._id;
    });
    it('should get all tags', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/api/tags');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tags fetched successfully');
        expect(response.body.data.length).toBeGreaterThan(0);
    });
    it('should update a tag', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .put(`/api/tags/${tagId}`)
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'Updated Tag' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tag updated successfully');
        expect(response.body.data.name).toBe('Updated Tag');
    });
    it('should delete a tag', async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete(`/api/tags/${tagId}`).set('Cookie', `accessToken=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tag deleted successfully');
    });
});
