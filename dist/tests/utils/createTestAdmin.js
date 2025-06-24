"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTestAdmin = async () => {
    const password = await bcryptjs_1.default.hash('testpassword', 10);
    const admin = await Admin_1.default.create({ email: 'test@test.com', password });
    const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { admin, token };
};
exports.createTestAdmin = createTestAdmin;
