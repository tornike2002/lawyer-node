"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getLatestBlogs = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const slugify_1 = __importDefault(require("slugify"));
const createBlog = async (req, res) => {
    const slug = (0, slugify_1.default)(req.body.title, { lower: true, strict: true });
    const exists = await Blog_1.default.findOne({ slug });
    if (exists) {
        res.status(400).json({ message: 'Blog already exists' });
        return;
    }
    const blog = await Blog_1.default.create({ ...req.body, slug });
    res.status(201).json({ message: 'Blog created successfully', data: blog });
};
exports.createBlog = createBlog;
const getAllBlogs = async (req, res) => {
    const { category, tags, search, page = 1, limit = 5 } = req.query;
    const filters = {};
    if (category)
        filters.category = category;
    if (tags)
        filters.tag = { $in: tags.split(',') };
    if (search)
        filters.search = { $search: search };
    const skip = (Number(page) - 1) * Number(limit);
    const [blogs, total] = await Promise.all([
        Blog_1.default.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Blog_1.default.countDocuments(filters),
    ]);
    res.status(200).json({
        page: Number(page),
        total,
        totalPages: Math.ceil(total / Number(limit)),
        data: blogs,
        message: 'Blogs fetched successfully',
    });
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (req, res) => {
    const data = await Blog_1.default.findOne({ slug: req.params.slug });
    if (!data) {
        res.status(404).json({ message: 'Blog not found' });
        return;
    }
    res.status(200).json({ message: 'Blog fetched successfully', data });
};
exports.getBlogBySlug = getBlogBySlug;
const getLatestBlogs = async (_req, res) => {
    const data = await Blog_1.default.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({ message: 'Latest blogs fetched successfully', data });
};
exports.getLatestBlogs = getLatestBlogs;
const updateBlog = async (req, res) => {
    const data = await Blog_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
        res.status(404).json({ message: 'Blog not found' });
        return;
    }
    res.status(200).json({ message: 'Blog updated successfully', data });
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    const data = await Blog_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Blog not found' });
        return;
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
};
exports.deleteBlog = deleteBlog;
