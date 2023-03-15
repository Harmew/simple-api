import { Request, Response, Router } from "express";

import { PrismaClient } from "@prisma/client";

import { UserModel } from "./models/UserModel";

export const userRoute = Router();
const prisma = new PrismaClient();

// GET
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

// GET BY ID
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

// POST
userRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, birthDate, sex }: UserModel = req.body;
    if (!name || !email || !birthDate || !sex) {
      res.status(400).send({ message: "Dados inválidos" });
      return;
    } else {
      await prisma.user
        .create({
          data: {
            name,
            email,
            birthDate: new Date(birthDate),
            sex,
          },
        })
        .then((user) => {
          res.status(201).send(user);
        })
        .catch(() => {
          res.status(400).send({ message: "Problema em criar o usuário" });
        });
    }
  } catch (err) {
    res.status(400).send({ message: "Problema em criar o usuário" });
  }
});

// PUT
userRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, birthDate, sex }: UserModel = req.body;

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
    await prisma.user
      .update({
        where: { id: parseInt(id) },
        data: {
          name: name || user.name,
          email: email || user.email,
          birthDate: birthDate ? new Date(birthDate) : user.birthDate,
          sex: sex || user.sex,
        },
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(() => {
        res.status(400).send({ message: "Problema em atualizar o usuário" });
      });
  } catch (err) {}
});

// DELETE
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
