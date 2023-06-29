"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    fullName: {
        type: String,
        require: [true, "Write your name"],
    },
    userName: {
        type: String,
        require: [true, "Emails is require"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Set password for user"],
    },
    accessToken: {
        type: String,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });
const User = (0, mongoose_1.model)("user", userModel);
exports.User = User;
//# sourceMappingURL=user.js.map