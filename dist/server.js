"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const carousel_1 = __importDefault(require("./routes/carousel"));
const banners_1 = __importDefault(require("./routes/banners"));
const quoteCarousel_1 = __importDefault(require("./routes/quoteCarousel"));
const partner_1 = __importDefault(require("./routes/partner"));
const contact_1 = __importDefault(require("./routes/contact"));
const faq_1 = __importDefault(require("./routes/faq"));
const practice_1 = __importDefault(require("./routes/practice"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const category_1 = __importDefault(require("./routes/category"));
const tags_1 = __importDefault(require("./routes/tags"));
const business_1 = __importDefault(require("./routes/business"));
const comment_1 = __importDefault(require("./routes/comment"));
const address_1 = __importDefault(require("./routes/address"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth', auth_1.default);
app.use('/api/carousel', carousel_1.default);
app.use('/api/banners', banners_1.default);
app.use('/api/quotes', quoteCarousel_1.default);
app.use('/api/partner', partner_1.default);
app.use('/api/contact', contact_1.default);
app.use('/api/faq', faq_1.default);
app.use('/api/practice', practice_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/categories', category_1.default);
app.use('/api/tags', tags_1.default);
app.use('/api/business', business_1.default);
app.use('/api/comment', comment_1.default);
app.use('/api/address', address_1.default);
exports.default = app;
