"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContacts = exports.createContact = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const createContact = async (req, res) => {
    const contactData = await Contact_1.default.create(req.body);
    res.status(201).json({
        message: 'Contact created successfully',
        contact: contactData,
    });
};
exports.createContact = createContact;
const getContacts = async (_req, res) => {
    const contacts = await Contact_1.default.find();
    res.status(200).json({
        message: 'Contacts fetched successfully',
        contacts,
    });
};
exports.getContacts = getContacts;
const updateContact = async (req, res) => {
    const contact = await Contact_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!contact) {
        res.status(404).json({
            message: 'Contact not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Contact updated successfully',
        contact,
    });
};
exports.updateContact = updateContact;
const deleteContact = async (req, res) => {
    const contact = await Contact_1.default.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404).json({
            message: 'Contact not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Contact deleted successfully',
        contact,
    });
};
exports.deleteContact = deleteContact;
