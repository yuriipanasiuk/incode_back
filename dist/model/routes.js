"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_1 = __importDefault(require("../auth/validation"));
const validateRegisterField_1 = __importDefault(require("../auth/validateRegisterField"));
const validateLoginField_1 = __importDefault(require("../auth/validateLoginField"));
const validateRefreshToken_1 = __importDefault(require("../auth/validateRefreshToken"));
const authMiddleware_1 = require("../auth/authMiddleware");
const router = (0, express_1.Router)();
router.post("/register", (0, validation_1.default)(validateRegisterField_1.default), auth_controller_1.singUp);
router.post("/login", (0, validation_1.default)(validateLoginField_1.default), auth_controller_1.loginUser);
router.post("/logout", authMiddleware_1.auth, auth_controller_1.logOut);
router.post("/refresh", (0, validation_1.default)(validateRefreshToken_1.default), auth_controller_1.refresh);
router.get("/current", authMiddleware_1.auth, auth_controller_1.getCurrent);
router.get("/docs");
exports.default = router;
//# sourceMappingURL=routes.js.map