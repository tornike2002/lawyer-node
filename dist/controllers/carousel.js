"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarouselItem = exports.updateCarousel = exports.createCarousel = exports.getAllCarousel = void 0;
const Carousel_1 = __importDefault(require("../models/Carousel"));
const getAllCarousel = async (_req, res) => {
    const items = await Carousel_1.default.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ message: 'Carousel fetched successfully', data: items });
};
exports.getAllCarousel = getAllCarousel;
const createCarousel = async (req, res) => {
    const item = await Carousel_1.default.create(req.body);
    res.status(201).json({ message: 'Carousel created successfully', data: item });
};
exports.createCarousel = createCarousel;
const updateCarousel = async (req, res) => {
    const updatedItem = await Carousel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
        res.status(404).json({ message: 'Carousel not found' });
        return;
    }
    res.status(200).json({ message: 'Carousel updated successfully', data: updatedItem });
};
exports.updateCarousel = updateCarousel;
const deleteCarouselItem = async (req, res) => {
    const deletedItem = await Carousel_1.default.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
        res.status(404).json({ message: 'Carousel not found' });
        return;
    }
    res.status(200).json({ message: 'Item deleted successfully' });
};
exports.deleteCarouselItem = deleteCarouselItem;
