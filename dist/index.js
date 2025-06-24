"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db"));
const swagger_1 = require("./config/swagger");
const PORT = process.env.PORT || 4000;
const startServer = async () => {
    await (0, db_1.default)();
    (0, swagger_1.setupSwagger)(server_1.default);
    server_1.default.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};
startServer();
