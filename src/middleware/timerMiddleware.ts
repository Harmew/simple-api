import { Request, Response, NextFunction } from "express";

export function timerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const time = new Date(2003, 11, 3).toLocaleTimeString();
  const timeNow = new Date().toLocaleTimeString();

  if (timeNow < time) res.status(400).send({ message: "Serviço indisponível" });
  else next();
}
