import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { UserModel } from "../models/UserModel";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (user) res.status(200).send(user);
  else res.status(404).send({ message: "Usuário não encontrado" });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, birthDate, sex }: UserModel = req.body;

  if (!name || !email || !birthDate || !sex) {
    res.status(400).send({ message: "Dados inválidos" });
    return;
  }

  const data = {
    name,
    email,
    birthDate: new Date(birthDate),
    sex,
  };

  await prisma.user
    .create({ data })
    .then((user) => res.status(201).send(user))
    .catch(() => {
      res.status(400).send({ message: "Problema em criar o usuário" });
    });
};

export const updateUser = async (req: Request, res: Response) => {
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
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res.status(400).send({ message: "Problema em atualizar o usuário" });
    });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.user
    .delete({ where: { id: parseInt(id) } })
    .then(() => {
      res.status(200).send({ message: "Usuário deletado com sucesso" });
    })
    .catch(() => {
      res.status(400).send({ message: "Problema em deletar o usuário" });
    });
};
