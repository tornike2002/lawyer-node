"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("../server"));
const createTestAdmin_1 = require("./utils/createTestAdmin");
const node_test_1 = require("node:test");
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
(0, node_test_1.describe)('Partners API', () => {
    let id;
    it('should get all partners', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/partner');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe('Partners fetched successfully');
    });
    it('should create partner', async () => {
        const partnerData = {
            fullname: 'test',
            position: 'test',
            about: 'about',
            biography: 'bio',
            image: 'https://www.google.com/',
            cover: 'https://www.google.com/',
            contact: {
                linkedin: 'https://www.google.com/',
                phone: '555223344',
                email: 'test@test.com',
            },
            services: [],
        };
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/partner')
            .set('Cookie', `accessToken=${token}`)
            .send(partnerData);
        expect(res.status).toBe(201);
        id = res.body.data._id;
    });
    it('should get partner by id', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/partner/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Partner fetched successfully');
        expect(res.body.data._id).toBe(id);
        expect(Array.isArray(res.body.data.services)).toBe(true);
    });
    it('should update partner', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/partner/${id}`)
            .set('Cookie', `accessToken=${token}`)
            .send({
            fullname: 'test',
            position: 'test',
            about: 'about',
            biography: 'bioo',
            image: 'https://www.google.com/',
            cover: 'https://www.google.com/',
            contact: {
                linkedin: 'https://www.google.com/',
                phone: '555223344',
                email: 'test@test.com',
            },
            services: [],
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Partner updated successfully');
        expect(res.body.data.fullname).toBe('test');
        expect(res.body.data.position).toBe('test');
        expect(res.body.data.about).toBe('about');
        expect(res.body.data.biography).toBe('bioo');
        expect(res.body.data.image).toBe('https://www.google.com/');
        expect(res.body.data.cover).toBe('https://www.google.com/');
        expect(res.body.data.contact.linkedin).toBe('https://www.google.com/');
        expect(res.body.data.contact.phone).toBe('555223344');
        expect(res.body.data.contact.email).toBe('test@test.com');
    });
    it('should delete partner', async () => {
        if (!id) {
            const createRes = await (0, supertest_1.default)(server_1.default)
                .post('/api/partner')
                .set('Cookie', `accessToken=${token}`)
                .send({
                fullname: 'test for delete',
                position: 'test',
                about: 'about',
                biography: 'bio',
                image: 'https://www.google.com/',
                cover: 'https://www.google.com/',
                contact: {
                    linkedin: 'https://www.google.com/',
                    phone: '555223344',
                    email: 'test@test.com',
                },
                services: [],
            });
            id = createRes.body._id;
        }
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/partner/${id}`).set('Cookie', `token=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Partner deleted successfully');
    });
});
