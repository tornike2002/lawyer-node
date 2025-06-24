"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanners = exports.updateBanners = exports.createBanners = exports.getAllBanners = void 0;
const Banners_1 = __importDefault(require("../models/Banners"));
const getAllBanners = async (_req, res) => {
    const data = await Banners_1.default.find().sort({ createdAt: -1 }).limit(2);
    res.status(200).json({ message: 'Banners fetched successfully', data });
};
exports.getAllBanners = getAllBanners;
const createBanners = async (req, res) => {
    const data = await Banners_1.default.create(req.body);
    res.status(201).json({ message: 'Banners created successfully', data });
};
exports.createBanners = createBanners;
const updateBanners = async (req, res) => {
    const data = await Banners_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
        res.status(404).json({ message: 'Banners item not found' });
        return;
    }
    res.status(200).json({ message: 'Banners updated successfully', data });
};
exports.updateBanners = updateBanners;
const deleteBanners = async (req, res) => {
    const data = await Banners_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Banner item not found' });
        return;
    }
    res.status(200).json({ message: 'Banner item deleted successfully' });
};
exports.deleteBanners = deleteBanners;
