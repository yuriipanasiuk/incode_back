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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = require("../model/user");
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = '' } = req.headers;
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer') {
            return next((0, http_errors_1.default)(401, 'Not autorized'));
        }
        const { id } = jsonwebtoken_1.default.verify(token, ACCESS_SECRET_KEY);
        const user = yield user_1.User.findOne({ _id: id });
        if (!user || !user.accessToken) {
            return next((0, http_errors_1.default)(401, 'Not autorized'));
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'invalid signature') {
                return res.status(401).json({ error: 'Not autorized' });
            }
        }
        next(error);
    }
});
exports.auth = auth;
//# sourceMappingURL=authMiddleware.js.map