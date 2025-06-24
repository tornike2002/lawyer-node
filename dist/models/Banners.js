"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bannersSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    revenue: { type: String },
}, { timestamps: true });
const Banners = mongoose_1.default.model('Banners', bannersSchema);
exports.default = Banners;
