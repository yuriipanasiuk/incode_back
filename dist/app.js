"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const auth_1 = __importDefault(require("./routes/auth"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const formatLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)(formatLogger));
app.use("/auth", auth_1.default);
app.use("/auth-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, _req, res, _next) => {
    const { status = 500 } = err;
    return res.status(status).json({ message: err.message });
});
exports.default = app;
//# sourceMappingURL=app.js.map