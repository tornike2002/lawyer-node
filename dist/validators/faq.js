"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.faqSchema = zod_1.default.object({
    question: zod_1.default.string().min(1),
    answer: zod_1.default.string().min(1),
});
