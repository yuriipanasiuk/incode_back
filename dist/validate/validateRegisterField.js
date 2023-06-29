"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateRegisterField = joi_1.default.object({
    fullName: joi_1.default.string(),
    userName: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.default = validateRegisterField;
//# sourceMappingURL=validateRegisterField.js.map