"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoute = express_1.default.Router();
// Auth Routes (Public)
exports.userRoute.post("/auth/login", auth_controller_1.login);
exports.userRoute.post("/auth/logout", auth_middleware_1.logoutMiddleware);
// User Routes (Public)
exports.userRoute.post("/users", user_controller_1.createUser);
// User Routes (Private)
exports.userRoute.get("/users", auth_middleware_1.authMiddleware, user_controller_1.getUsers);
exports.userRoute.get("/users/:id", auth_middleware_1.authMiddleware, user_controller_1.getUserById);
exports.userRoute.put("/users/:id", auth_middleware_1.authMiddleware, user_controller_1.updateUser);
exports.userRoute.delete("/users/:id", auth_middleware_1.authMiddleware, user_controller_1.deleteUser);
