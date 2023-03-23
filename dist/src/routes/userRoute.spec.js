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
const request = require("supertest");
const { app } = require("../../server");
const data = {
    name: "Teste",
    email: "teste@teste.com",
    birthDate: new Date(2023).toISOString(),
    sex: "Masculino",
};
describe("Rota api/users", () => {
    let id; // Variável para armazenar o id do usuário criado
    describe("Método POST", () => {
        it("Deve criar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).post("/api/users").send(data);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(expect.objectContaining({
                id: res.body.id,
                name: "Teste",
                email: "teste@teste.com",
                birthDate: new Date(2023).toISOString(),
                sex: "Masculino",
            }));
            id = res.body.id;
        }));
        it("Deve retornar uma mensagem de erro quando o usuário não passar algum atributo", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).post("/api/users").send({ name: "Teste" });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(expect.objectContaining({ message: "Dados inválidos" }));
        }));
        it("Deve retornar uma mensagem de erro quando passar um formato de dado diferente", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .post("/api/users")
                .send(Object.assign(Object.assign({}, data), { birthDate: "teste" }));
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(expect.objectContaining({ message: "Problema em criar o usuário" }));
        }));
    });
    describe("Método GET", () => {
        it("Deve retornar uma lista de usuários", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).get("/api/users");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    birthDate: expect.any(String),
                    sex: expect.any(String),
                }),
            ]));
        }));
        it("Deve retornar um usuário específico", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).get(`/api/users/${id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.objectContaining({
                id: id,
                name: expect.any(String),
                email: expect.any(String),
                birthDate: expect.any(String),
                sex: expect.any(String),
            }));
        }));
        it("Deve retornar uma mensagem de erro quando o usuário especifico não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).get(`/api/users/0`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(expect.objectContaining({ message: "Usuário não encontrado" }));
        }));
    });
    describe("Método PUT", () => {
        it("Deve atualizar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .put(`/api/users/${id}`)
                .send(Object.assign(Object.assign({}, data), { name: "Teste 2" }));
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.objectContaining({
                id: id,
                name: "Teste 2",
                email: expect.any(String),
                birthDate: expect.any(String),
                sex: expect.any(String),
            }));
        }));
        it("Deve atualizar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).put(`/api/users/${id}`).send();
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.objectContaining({
                id: id,
                name: expect.any(String),
                email: expect.any(String),
                birthDate: expect.any(String),
                sex: expect.any(String),
            }));
        }));
        it("Deve retornar uma mensagem de erro quando o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).put(`/api/users/0`).send(data);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(expect.objectContaining({ message: "Usuário não encontrado" }));
        }));
        it("Deve retornar uma mensagem de erro quando passar um formato de dado diferente", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .put(`/api/users/${id}`)
                .send(Object.assign(Object.assign({}, data), { birthDate: "teste" }));
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(expect.objectContaining({ message: "Problema em atualizar o usuário" }));
        }));
    });
    describe("Método DELETE", () => {
        it("Deve deletar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).delete(`/api/users/${id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.objectContaining({ message: "Usuário deletado com sucesso" }));
        }));
        it("Deve retornar uma mensagem de erro quando o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app).delete(`/api/users/0`);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(expect.objectContaining({ message: "Problema em deletar o usuário" }));
        }));
    });
});
