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
    await mongoose_1.default.connection.db?.dropDatabase();
    await mongoose_1.default.connection.close();
});
describe('Contact API', () => {
    let id;
    it('should create a contact', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/contact')
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'John Doe', email: 'john@doe.com', message: 'Hello, world!' });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Contact created successfully');
        id = res.body.contact._id;
    });
    it('should get all contacts', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/contact').set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Contacts fetched successfully');
    });
    it('should update a contact', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/contact/${id}`)
            .set('Cookie', `accessToken=${token}`)
            .send({ name: 'John Doe', email: 'john@doe.com', message: 'Hello, world!' });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Contact updated successfully');
    });
    it('should delete a contact', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/contact/${id}`).set('Cookie', `accessToken=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Contact deleted successfully');
    });
});
