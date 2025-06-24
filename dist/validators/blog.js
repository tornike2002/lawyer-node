"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(3),
    subTitle: zod_1.default.string().min(3).optional(),
    slug: zod_1.default.string().min(3),
    content: zod_1.default.string().min(10),
    images: zod_1.default.array(zod_1.default.string().url()),
    category: zod_1.default.string().min(3),
    tags: zod_1.default.array(zod_1.default.string()).min(1),
    author: zod_1.default.string().min(3),
    share: zod_1.default.object({
        facebook: zod_1.default.string().url().optional(),
        linkedin: zod_1.default.string().url().optional(),
        x: zod_1.default.string().url().optional(),
        instagram: zod_1.default.string().url().optional(),
    }),
    lawWays: zod_1.default.string().min(3).optional(),
});
exports.createBlogSchema = createBlogSchema;
const updateBlogSchema = createBlogSchema.partial();
exports.updateBlogSchema = updateBlogSchema;
