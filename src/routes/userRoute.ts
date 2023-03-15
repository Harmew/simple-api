import { Request, Response, Router } from "express";

import { PrismaClient } from "@prisma/client";

import { UserModel } from "./models/UserModel";

export const userRoute = Router();
const prisma = new PrismaClient();

userRoute.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length > 0) {
      res.status(200).json(users);
      return;
    } else {
      res.status(204).send({ message: "Nenhum usuário encontrado" });
      return;
    }
  } catch (err) {
    res.status(404).send({ message: "Problema em buscar os usuário" });
  }
});

userRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (user) res.status(200).send(user);
    else throw new Error();
  } catch (err) {
    res.status(404).send({
      message: "Nenhum usuário encontrado",
    });
  }
});

userRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.user
      .delete({
        where: { id: parseInt(id) },
      })
      .then(() => {
        res.status(200).send({ message: "Usuário deletado com sucesso" });
      })
      .catch(() => {
        res.status(400).send({ message: "Problema em deletar o usuário" });
      });
  } catch (err) {
    res.status(400).send({ message: "Problema em deletar o usuário" });
  }
});
