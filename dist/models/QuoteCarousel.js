"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuoteCarouselSchema = new mongoose_1.default.Schema({
    quote: { type: String, required: true },
    rating: { type: Number, required: true },
    fullname: { type: String, required: true },
    position: { type: String, required: true },
}, { timestamps: true });
const QuoteSchema = mongoose_1.default.model('Quote', QuoteCarouselSchema);
exports.default = QuoteSchema;
