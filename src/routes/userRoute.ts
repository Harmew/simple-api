import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export const userRoute = express.Router();

// User Routes (Public)
userRoute.post("/users", createUser);

// User Routes (Private)
userRoute.get("/users", authMiddleware, getUsers);
userRoute.get("/users/:id", authMiddleware, getUserById);
userRoute.put("/users/:id", authMiddleware, updateUser);
userRoute.delete("/users/:id", authMiddleware, deleteUser);
