"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.refreshToken = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = __importDefault(require("../models/Admin"));
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { email, password } = req.body;
    const existingAdmin = await Admin_1.default.findOne({ email });
    if (existingAdmin) {
        res.status(400).json({
            message: 'Admin already exists',
        });
        return;
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const admin = await Admin_1.default.create({
        email,
        password: hashedPassword,
    });
    const accessToken = (0, jwt_1.generateToken)(admin._id.toString());
    const refreshToken = (0, jwt_1.generateRefreshToken)(admin._id.toString());
    admin.refreshToken = refreshToken;
    await admin.save();
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
    res.status(201).json({
        message: 'Admin registered successfully',
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin_1.default.findOne({ email });
    if (!admin) {
        res.status(401).json({
            message: 'Invalid credentials',
        });
        return;
    }
    const match = await bcryptjs_1.default.compare(password, admin.password);
    if (!match) {
        res.status(401).json({
            message: 'Invalid credentials',
        });
        return;
    }
    const accessToken = (0, jwt_1.generateToken)(admin._id.toString());
    const refreshToken = (0, jwt_1.generateRefreshToken)(admin._id.toString());
    admin.refreshToken = refreshToken;
    await admin.save();
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
    res.status(200).json({
        message: 'Admin logged in successfully',
    });
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Admin logged out successfully',
    });
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({
            message: 'Unauthorized',
        });
        return;
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
        });
        return;
    }
    const admin = await Admin_1.default.findById(payload.id);
    if (!admin || admin.refreshToken !== refreshToken) {
        res.status(403).json({
            message: 'Refresh token is invalid',
        });
        return;
    }
    const newAccessToken = (0, jwt_1.generateToken)(admin._id.toString());
    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
    });
    res.status(200).json({
        message: 'Token refreshed',
    });
};
exports.refreshToken = refreshToken;
const me = async (req, res) => {
    const userId = req.user;
    const admin = await Admin_1.default.findById(userId);
    if (!admin) {
        res.status(401).json({
            message: 'Unauthorized',
        });
        return;
    }
    res.status(200).json({
        message: 'Admin fetched successfully',
        data: {
            _id: admin._id,
            email: admin.email,
        },
    });
};
exports.me = me;
