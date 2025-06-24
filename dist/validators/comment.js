"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCommentSchema = zod_1.default.object({
    name: zod_1.default.string().min(1),
    email: zod_1.default.string().email().optional(),
    content: zod_1.default.string().min(1),
    parentId: zod_1.default.string().optional(),
});
