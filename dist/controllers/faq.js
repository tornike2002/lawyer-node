"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.getFaqs = exports.createFaq = void 0;
const Faq_1 = __importDefault(require("../models/Faq"));
const createFaq = async (req, res) => {
    const faq = await Faq_1.default.create(req.body);
    res.status(201).json({ message: 'Faq created successfully', faq });
};
exports.createFaq = createFaq;
const getFaqs = async (_req, res) => {
    const faqs = await Faq_1.default.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Faqs fetched successfully', faqs });
};
exports.getFaqs = getFaqs;
const updateFaq = async (req, res) => {
    const faqs = await Faq_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faqs) {
        res.status(404).json({ message: 'Faq not found' });
        return;
    }
    res.status(200).json({ message: 'Faq updated successfully', faqs });
};
exports.updateFaq = updateFaq;
const deleteFaq = async (req, res) => {
    const faqs = await Faq_1.default.findByIdAndDelete(req.params.id);
    if (!faqs) {
        res.status(404).json({ message: 'Faq not found' });
        return;
    }
    res.status(200).json({ message: 'Faq deleted successfully' });
};
exports.deleteFaq = deleteFaq;
