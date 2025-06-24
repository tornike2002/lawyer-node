"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getAddress = exports.createAddress = void 0;
const Adress_1 = __importDefault(require("../models/Adress"));
const createAddress = async (req, res) => {
    const address = await Adress_1.default.create(req.body);
    res.status(201).json({
        message: 'Address created successfully',
        address,
    });
};
exports.createAddress = createAddress;
const getAddress = async (_req, res) => {
    const address = await Adress_1.default.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({
        message: 'Address fetched successfully',
        address,
    });
};
exports.getAddress = getAddress;
const updateAddress = async (req, res) => {
    const address = await Adress_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!address) {
        res.status(404).json({
            message: 'Address not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Address updated successfully',
        address,
    });
};
exports.updateAddress = updateAddress;
const deleteAddress = async (req, res) => {
    const address = await Adress_1.default.findByIdAndDelete(req.params.id);
    if (!address) {
        res.status(404).json({
            message: 'Address not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Address deleted successfully',
    });
};
exports.deleteAddress = deleteAddress;
