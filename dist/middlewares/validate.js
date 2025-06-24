"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: error.message,
                errors: error.errors.map((err) => ({
                    path: err.path.join('.'),
                })),
            });
            return;
        }
        else {
            res.status(400).json({
                message: 'Validation error',
            });
            return;
        }
    }
};
exports.validate = validate;
