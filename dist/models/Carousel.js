"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carouselSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link1: {
        type: String,
    },
    link2: {
        type: String,
    },
}, { timestamps: true });
const Carousel = mongoose_1.default.model('Carousel', carouselSchema);
exports.default = Carousel;
