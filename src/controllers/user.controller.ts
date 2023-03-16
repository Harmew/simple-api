import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

import { UserModel } from "../models/UserModel";

export const userRoute = Router();
const prisma = new PrismaClient();

// GET
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        sex: true,
      },
    });
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
};

// GET BY ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        sex: true,
      },
      where: { id: parseInt(id) },
    });
    if (user) res.status(200).send(user);
    else throw new Error();
  } catch (err) {
    res.status(404).send({
      message: "Nenhum usuário encontrado",
    });
  }
};

// POST
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, birthDate, sex }: UserModel = req.body;
    if (!name || !email || !birthDate || !sex || !password) {
      res.status(400).send({ message: "Dados inválidos" });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user
        .create({
          data: {
            name,
            email,
            password: hashedPassword,
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
};

// PUT
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, birthDate, sex }: UserModel = req.body;

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }

    if (user.id !== req.userId) {
      res.status(401).send({ message: "Não autorizado" });
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
  } catch (err) {
    res.status(400).send({ message: "Problema em atualizar o usuário" });
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
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
};
