"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePartner = exports.updatePartner = exports.getPartnerById = exports.getAllPartners = exports.createPartner = void 0;
const Partner_1 = __importDefault(require("../models/Partner"));
const createPartner = async (req, res) => {
    const data = await Partner_1.default.create(req.body);
    res.status(201).json({ message: 'Partner created successfully', data });
};
exports.createPartner = createPartner;
const getAllPartners = async (req, res) => {
    const { limit = 10 } = req.query;
    const partners = await Partner_1.default.find().sort({ createdAt: -1 }).limit(Number(limit));
    res.status(200).json({ message: 'Partners fetched successfully', data: partners });
};
exports.getAllPartners = getAllPartners;
const getPartnerById = async (req, res) => {
    const partner = await Partner_1.default.findById(req.params.id);
    if (!partner) {
        res.status(404).json({ message: 'Partner not found' });
        return;
    }
    res.status(200).json({ message: 'Partner fetched successfully', data: partner });
};
exports.getPartnerById = getPartnerById;
const updatePartner = async (req, res) => {
    const data = await Partner_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
        res.status(404).json({ message: 'Partner not found' });
        return;
    }
    res.status(200).json({ message: 'Partner updated successfully', data });
};
exports.updatePartner = updatePartner;
const deletePartner = async (req, res) => {
    const data = await Partner_1.default.findByIdAndDelete(req.params.id);
    if (!data) {
        res.status(404).json({ message: 'Partner not found' });
        return;
    }
    res.status(200).json({ message: 'Partner deleted successfully' });
};
exports.deletePartner = deletePartner;
