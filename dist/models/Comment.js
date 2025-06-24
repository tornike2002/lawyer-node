"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    blogId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Blog', required: true },
    parentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment', default: null },
    name: { type: String, required: true },
    email: { type: String },
    content: { type: String, required: true },
}, { timestamps: true });
commentSchema.index({ blogId: 1, createdAt: -1 });
commentSchema.index({ parentId: 1 });
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
