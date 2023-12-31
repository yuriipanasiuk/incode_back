"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.getCurrent = exports.logOut = exports.loginUser = exports.singUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const user_1 = require("../model/user");
(0, dotenv_1.config)();
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const singUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, userName, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ userName });
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        if (user) {
            return next((0, http_errors_1.default)(409, "User name in use"));
        }
        yield user_1.User.create({
            fullName,
            userName,
            password: hashPassword,
        });
        res.status(201).json({
            user: {
                fullName,
                userName,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.singUp = singUp;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ userName });
        if (!user) {
            return next((0, http_errors_1.default)(401, "User name or password is wrong"));
        }
        const passwordCompare = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordCompare) {
            return next((0, http_errors_1.default)(401, "User name  or password is wrong"));
        }
        const payload = {
            id: user._id,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET_KEY, {
            expiresIn: "3h",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET_KEY, {
            expiresIn: "7h",
        });
        yield user_1.User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
        res.json({
            accessToken,
            refreshToken,
            user: {
                userName,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user || {};
    try {
        yield user_1.User.findByIdAndUpdate(_id, {
            accessToken: null,
            refreshToken: null,
        });
        res.status(204).json();
    }
    catch (error) {
        next(error);
    }
});
exports.logOut = logOut;
const getCurrent = (req, res, _next) => {
    const { fullName, userName } = req.user || {};
    res.json({
        user: {
            fullName,
            userName,
        },
    });
};
exports.getCurrent = getCurrent;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken: token } = req.body;
    try {
        const { id } = jsonwebtoken_1.default.verify(token, REFRESH_SECRET_KEY);
        const isExist = yield user_1.User.findOne({ refreshToken: token });
        if (!isExist) {
            next((0, http_errors_1.default)(403, "Token invalid"));
        }
        const payload = {
            id,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET_KEY, {
            expiresIn: "3h",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET_KEY, {
            expiresIn: "7h",
        });
        res.json({
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next((0, http_errors_1.default)(403, error.message));
        }
    }
});
exports.refresh = refresh;
//# sourceMappingURL=auth.controller.js.map