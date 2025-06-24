"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteCarouselSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.quoteCarouselSchema = zod_1.default.object({
    quote: zod_1.default.string().min(1),
    rating: zod_1.default.number().min(0).max(5),
    fullname: zod_1.default.string().min(1),
    position: zod_1.default.string().min(1),
});
