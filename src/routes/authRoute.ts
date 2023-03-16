import express from "express";
import { logoutMiddleware } from "../middleware/auth.middleware";
import { login } from "../controllers/auth.controller";

export const authRoute = express.Router();

// Auth Routes (Public)
authRoute.post("/auth/login", login);
authRoute.post("/auth/logout", logoutMiddleware);
