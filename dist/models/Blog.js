"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    images: { type: [{ type: String }], required: true },
    category: { type: String, required: true },
    tags: { type: [{ type: String }], required: true },
    author: { type: String, required: true },
    share: {
        facebook: { type: String },
        linkedin: { type: String },
        x: { type: String },
        instagram: { type: String },
    },
    lawWays: {
        type: String,
    },
}, { timestamps: true });
blogSchema.pre('save', function (next) {
    if (this.slug) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
blogSchema.index({ title: 'text', content: 'text' });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
const Blog = mongoose_1.default.model('Blog', blogSchema);
exports.default = Blog;
