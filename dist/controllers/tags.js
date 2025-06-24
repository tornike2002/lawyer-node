"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.getAllTags = exports.createTag = void 0;
const Tags_1 = __importDefault(require("../models/Tags"));
const createTag = async (req, res) => {
    const data = await Tags_1.default.create(req.body);
    res.status(201).json({ message: 'Tag created successfully', data });
};
exports.createTag = createTag;
const getAllTags = async (_req, res) => {
    const data = await Tags_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Tags fetched successfully', data });
};
exports.getAllTags = getAllTags;
const updateTag = async (req, res) => {
    const data = await Tags_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
        res.status(404).json({ message: 'Tag not found' });
        return;
    }
    res.status(200).json({ message: 'Tag updated successfully', data });
};
exports.updateTag = updateTag;
const deleteTag = async (req, res) => {
    const data = await Tags_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Tag not found' });
        return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
};
exports.deleteTag = deleteTag;
