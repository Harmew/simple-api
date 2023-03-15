"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = require("./src/routes/userRoute");
const corsConfig_1 = require("./src/global/corsConfig");
const timerMiddleware_js_1 = require("./src/middleware/timerMiddleware.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsConfig_1.corsConfig));
app.use(timerMiddleware_js_1.timerMiddleware);
app.use("/api/users", userRoute_1.userRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
