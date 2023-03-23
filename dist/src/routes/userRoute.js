"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoute = (0, express_1.Router)();
// User Routes (Public)
exports.userRoute.get("/users", user_controller_1.getUsers);
exports.userRoute.get("/users/:id", user_controller_1.getUserById);
exports.userRoute.post("/users", user_controller_1.createUser);
exports.userRoute.put("/users/:id", user_controller_1.updateUser);
exports.userRoute.delete("/users/:id", user_controller_1.deleteUser);
