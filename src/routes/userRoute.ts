import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export const userRoute = Router();

// User Routes (Public)
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", getUserById);
userRoute.post("/users", createUser);
userRoute.put("/users/:id", updateUser);
userRoute.delete("/users/:id", deleteUser);
