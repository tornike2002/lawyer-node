"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.partnerSchema = zod_1.default.object({
    fullname: zod_1.default.string().min(1),
    position: zod_1.default.string().min(1),
    about: zod_1.default.string().min(1),
    biography: zod_1.default.string().min(1),
    image: zod_1.default.string().url(),
    cover: zod_1.default.string().url().optional(),
    contact: zod_1.default.object({
        linkedin: zod_1.default.string().url().optional(),
        phone: zod_1.default.string().optional(),
        email: zod_1.default.string().email().optional(),
    }),
    services: zod_1.default.array(zod_1.default.string().optional()),
});
