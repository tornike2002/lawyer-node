"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusiness = exports.updateBusiness = exports.getAllBusinesses = exports.createBusiness = void 0;
const Business_1 = __importDefault(require("../models/Business"));
const createBusiness = async (req, res) => {
    const data = await Business_1.default.create(req.body);
    res.status(201).json({ message: 'Business created successfully', data });
};
exports.createBusiness = createBusiness;
const getAllBusinesses = async (_req, res) => {
    const data = await Business_1.default.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ message: 'Businesses fetched successfully', data });
};
exports.getAllBusinesses = getAllBusinesses;
const updateBusiness = async (req, res) => {
    const data = await Business_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!data) {
        res.status(404).json({ message: 'Business not found' });
        return;
    }
    res.status(200).json({ message: 'Business updated successfully', data });
};
exports.updateBusiness = updateBusiness;
const deleteBusiness = async (req, res) => {
    const data = await Business_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Business not found' });
        return;
    }
    res.status(200).json({ message: 'Business deleted successfully' });
};
exports.deleteBusiness = deleteBusiness;
