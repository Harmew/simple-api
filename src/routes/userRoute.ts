import express from "express";
import {
  authMiddleware,
  logoutMiddleware,
} from "../middleware/auth.middleware";
import { login } from "../controllers/auth.controller";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export const userRoute = express.Router();

// Auth Routes (Public)
userRoute.post("/auth/login", login);
userRoute.post("/auth/logout", logoutMiddleware);

// User Routes (Public)
userRoute.post("/users", createUser);

// User Routes (Private)
userRoute.get("/users", authMiddleware, getUsers);
userRoute.get("/users/:id", authMiddleware, getUserById);
userRoute.put("/users/:id", authMiddleware, updateUser);
userRoute.delete("/users/:id", authMiddleware, deleteUser);
