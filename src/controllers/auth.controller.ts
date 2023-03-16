import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserModel = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "E-mail não existe" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.status(200).json({ result: token });
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
  }
};
