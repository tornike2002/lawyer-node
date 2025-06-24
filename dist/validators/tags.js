"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTagSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTagSchema = zod_1.default.object({
    name: zod_1.default.string().min(3),
});
