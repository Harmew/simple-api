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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (user)
        res.status(200).send(user);
    else
        res.status(404).send({ message: "Usuário não encontrado" });
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthDate, sex } = req.body;
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
    yield prisma.user
        .create({ data })
        .then((user) => res.status(201).send(user))
        .catch(() => {
        res.status(400).send({ message: "Problema em criar o usuário" });
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, email, birthDate, sex } = req.body;
    const user = yield prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
        res.status(404).send({ message: "Usuário não encontrado" });
        return;
    }
    yield prisma.user
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
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield prisma.user
        .delete({ where: { id: parseInt(id) } })
        .then(() => {
        res.status(200).send({ message: "Usuário deletado com sucesso" });
    })
        .catch(() => {
        res.status(400).send({ message: "Problema em deletar o usuário" });
    });
});
exports.deleteUser = deleteUser;
