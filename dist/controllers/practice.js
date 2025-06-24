"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePractice = exports.updatePractice = exports.getPracticeById = exports.getPractice = exports.createPractice = void 0;
const Practice_1 = __importDefault(require("../models/Practice"));
const createPractice = async (req, res) => {
    const practice = await Practice_1.default.create(req.body);
    res.status(201).json({
        message: 'Practice created successfully',
        practice,
    });
};
exports.createPractice = createPractice;
const getPractice = async (_req, res) => {
    const practice = await Practice_1.default.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({
        message: 'Practice fetched successfully',
        practice,
    });
};
exports.getPractice = getPractice;
const getPracticeById = async (req, res) => {
    const practice = await Practice_1.default.findById(req.params.id);
    if (!practice) {
        res.status(404).json({
            message: 'Practice not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Practice fetched successfully',
        practice,
    });
};
exports.getPracticeById = getPracticeById;
const updatePractice = async (req, res) => {
    const practice = await Practice_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!practice) {
        res.status(404).json({
            message: 'Practice not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Practice updated successfully',
        practice,
    });
};
exports.updatePractice = updatePractice;
const deletePractice = async (req, res) => {
    const practice = await Practice_1.default.findByIdAndDelete(req.params.id);
    if (!practice) {
        res.status(404).json({
            message: 'Practice not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Practice deleted successfully',
    });
};
exports.deletePractice = deletePractice;
