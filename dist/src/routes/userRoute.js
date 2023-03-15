"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
exports.userRoute = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.userRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        if (users.length > 0) {
            res.status(200).json(users);
            return;
        }
        else {
            res.status(204).send({ message: "Nenhum usuário encontrado" });
            return;
        }
    }
    catch (err) {
        res.status(404).send({ message: "Problema em buscar os usuário" });
    }
}));
exports.userRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (user)
            res.status(200).send(user);
        else
            throw new Error();
    }
    catch (err) {
        res.status(404).send({
            message: "Nenhum usuário encontrado",
        });
    }
}));
exports.userRoute.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.user
            .delete({
            where: { id: parseInt(id) },
        })
            .then(() => {
            res.status(200).send({ message: "Usuário deletado com sucesso" });
        })
            .catch(() => {
            res.status(400).send({ message: "Problema em deletar o usuário" });
        });
    }
    catch (err) {
        res.status(400).send({ message: "Problema em deletar o usuário" });
    }
}));