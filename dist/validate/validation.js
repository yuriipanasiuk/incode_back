"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const validation = (schema) => {
    return (req, _res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next((0, http_errors_1.default)(400, "missing required name field"));
        }
        next();
    };
};
exports.default = validation;
//# sourceMappingURL=validation.js.map