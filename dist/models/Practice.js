"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const practiceSchema = new mongoose_1.default.Schema({
    position: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
const PracticeSchema = mongoose_1.default.model('Practice', practiceSchema);
exports.default = PracticeSchema;
