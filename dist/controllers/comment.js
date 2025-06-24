"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getCommentsByBlog = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const createComment = async (req, res) => {
    const blogId = req.params.blogId;
    const { name, email, content, parentId } = req.body;
    const comment = await Comment_1.default.create({
        blogId,
        name,
        content,
        email: email || null,
        parentId: parentId || null,
    });
    res.status(201).json({
        message: 'Comment created successfully',
        comment,
    });
};
exports.createComment = createComment;
const getCommentsByBlog = async (req, res) => {
    const blogId = req.params.blogId;
    const comments = await Comment_1.default.find({ blogId }).sort({ createdAt: -1 }).lean();
    const grouped = {};
    const topLevel = comments.filter((comment) => !comment.parentId);
    const replies = comments.filter((comment) => comment.parentId);
    for (const reply of replies) {
        const parent = reply.parentId.toString();
        if (!grouped[parent])
            grouped[parent] = [];
        grouped[parent].push(reply);
    }
    const result = topLevel.map((comment) => ({
        ...comment,
        replies: grouped[comment._id.toString()] || [],
    }));
    res.status(200).json({
        message: 'Comments fetched successfully',
        result,
    });
};
exports.getCommentsByBlog = getCommentsByBlog;
const deleteComment = async (req, res) => {
    const deleted = await Comment_1.default.findByIdAndDelete(req.params.commentId);
    if (!deleted) {
        res.status(404).json({
            message: 'Comment not found',
        });
        return;
    }
    await Comment_1.default.deleteMany({ parentId: req.params.commentId });
    res.status(200).json({
        message: 'Comment deleted successfully',
    });
};
exports.deleteComment = deleteComment;
