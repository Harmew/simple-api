"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { userRoute } = require("./src/routes/userRoute");
const { corsConfig } = require("./src/global/corsConfig");
dotenv.config();
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.use(cors(corsConfig));
exports.app.use("/api/users", userRoute);