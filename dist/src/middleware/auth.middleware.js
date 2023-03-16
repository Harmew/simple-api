"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Token não informado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        return res.status(401).send({ message: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
const logoutMiddleware = (req, res, next) => {
    delete req.headers.authorization;
    res.status(200).send();
};
exports.logoutMiddleware = logoutMiddleware;
