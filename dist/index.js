"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const userRoute_1 = require("./src/routes/userRoute");
const corsConfig_1 = require("./src/global/corsConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)(corsConfig_1.corsConfig));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/", userRoute_1.userRoute);
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: "Algo deu errado" });
});
app.listen(port);
