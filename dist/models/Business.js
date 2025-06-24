"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const businessSchema = new mongoose_1.default.Schema({
    icon: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});
const Business = mongoose_1.default.model('Business', businessSchema);
exports.default = Business;
