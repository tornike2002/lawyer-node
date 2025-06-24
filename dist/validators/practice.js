"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.practiceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.practiceSchema = zod_1.default.object({
    position: zod_1.default.string().min(3),
    image: zod_1.default.string().url(),
    title: zod_1.default.string().min(3),
    description: zod_1.default.string().min(3),
});
