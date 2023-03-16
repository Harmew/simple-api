import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
};

export const logoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  delete req.headers.authorization;
  res.status(200).send();
};
