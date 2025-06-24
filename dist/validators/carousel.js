"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.carouselSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    subtitle: zod_1.default.string().min(1),
    image: zod_1.default.string().url(),
    link1: zod_1.default.string().url().optional(),
    link2: zod_1.default.string().url().optional(),
});
