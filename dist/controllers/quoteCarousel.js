"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuoteItem = exports.updateQuoteItem = exports.createQuoteItem = exports.getAllQuoteItems = void 0;
const QuoteCarousel_1 = __importDefault(require("../models/QuoteCarousel"));
const getAllQuoteItems = async (_req, res) => {
    const quoteItems = await QuoteCarousel_1.default.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ message: 'Quote Items fetched successfully', data: quoteItems });
};
exports.getAllQuoteItems = getAllQuoteItems;
const createQuoteItem = async (req, res) => {
    const quoteItem = await QuoteCarousel_1.default.create(req.body);
    res.status(201).json({ message: 'Quote Item created successfully', data: quoteItem });
};
exports.createQuoteItem = createQuoteItem;
const updateQuoteItem = async (req, res) => {
    const updatedItem = await QuoteCarousel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
        res.status(404).json({ message: 'Could not find item to update' });
        return;
    }
    res.status(200).json({ message: 'Quote Item updated successfully', data: updatedItem });
};
exports.updateQuoteItem = updateQuoteItem;
const deleteQuoteItem = async (req, res) => {
    const deletedItem = await QuoteCarousel_1.default.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
        res.status(404).json({ message: 'Could not find item to delete' });
        return;
    }
    res.status(200).json({ message: 'Quote Item deleted Successfully' });
};
exports.deleteQuoteItem = deleteQuoteItem;
