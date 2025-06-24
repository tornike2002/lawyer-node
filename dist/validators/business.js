"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusinessSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBusinessSchema = zod_1.default.object({
    icon: zod_1.default.string().url(),
    image: zod_1.default.string().url(),
});
