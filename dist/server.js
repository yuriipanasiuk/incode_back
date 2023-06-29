"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
mongoose_1.default
    .connect(DB_HOST, {
    connectTimeoutMS: 1000
})
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server working on ${PORT} port`);
    });
})
    .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
});
//# sourceMappingURL=server.js.map