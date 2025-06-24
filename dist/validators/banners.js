"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannersSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.bannersSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    link: zod_1.default.string().url().optional(),
    image: zod_1.default.string().url().optional(),
    revenue: zod_1.default.string().min(1).optional(),
});
