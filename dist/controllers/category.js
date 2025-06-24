"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (req, res) => {
    const data = await Category_1.default.create(req.body);
    res.status(201).json({ message: 'Category created successfully', data });
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    const data = await Category_1.default.find();
    res.status(200).json({ message: 'Categories fetched successfully', data });
};
exports.getAllCategories = getAllCategories;
const updateCategory = async (req, res) => {
    const data = await Category_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!data) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.status(200).json({ message: 'Category updated successfully', data });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const data = await Category_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
};
exports.deleteCategory = deleteCategory;
