"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const partnerSchema = new mongoose_1.default.Schema({
    fullname: { type: String, required: true },
    position: { type: String, required: true },
    about: { type: String, required: true },
    biography: { type: String, required: true },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    contact: {
        linkedin: { type: String },
        phone: { type: String },
        email: { type: String },
    },
    services: { type: [String], default: [] },
}, { timestamps: true });
const PartnerSchema = mongoose_1.default.model('Partner', partnerSchema);
exports.default = PartnerSchema;
