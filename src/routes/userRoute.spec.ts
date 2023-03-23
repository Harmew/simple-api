const request = require("supertest");
const { app } = require("../../server");

const data = {
  name: "Teste",
  email: "teste@teste.com",
  birthDate: new Date(2023).toISOString(),
  sex: "Masculino",
};

describe("Rota api/users", () => {
  let id: number; // Variável para armazenar o id do usuário criado

  describe("Método POST", () => {
    it("Deve criar um usuário", async () => {
      const res = await request(app).post("/api/users").send(data);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: res.body.id,
          name: "Teste",
          email: "teste@teste.com",
          birthDate: new Date(2023).toISOString(),
          sex: "Masculino",
        })
      );
      id = res.body.id;
    });

    it("Deve retornar uma mensagem de erro quando o usuário não passar algum atributo", async () => {
      const res = await request(app).post("/api/users").send({ name: "Teste" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Dados inválidos" })
      );
    });

    it("Deve retornar uma mensagem de erro quando passar um formato de dado diferente", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ ...data, birthDate: "teste" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Problema em criar o usuário" })
      );
    });
  });

  describe("Método GET", () => {
    it("Deve retornar uma lista de usuários", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            birthDate: expect.any(String),
            sex: expect.any(String),
          }),
        ])
      );
    });

    it("Deve retornar um usuário específico", async () => {
      const res = await request(app).get(`/api/users/${id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: expect.any(String),
          email: expect.any(String),
          birthDate: expect.any(String),
          sex: expect.any(String),
        })
      );
    });

    it("Deve retornar uma mensagem de erro quando o usuário especifico não for encontrado", async () => {
      const res = await request(app).get(`/api/users/0`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Usuário não encontrado" })
      );
    });
  });

  describe("Método PUT", () => {
    it("Deve atualizar um usuário", async () => {
      const res = await request(app)
        .put(`/api/users/${id}`)
        .send({ ...data, name: "Teste 2" });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Teste 2",
          email: expect.any(String),
          birthDate: expect.any(String),
          sex: expect.any(String),
        })
      );
    });

    it("Deve atualizar um usuário", async () => {
      const res = await request(app).put(`/api/users/${id}`).send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: expect.any(String),
          email: expect.any(String),
          birthDate: expect.any(String),
          sex: expect.any(String),
        })
      );
    });

    it("Deve retornar uma mensagem de erro quando o usuário não for encontrado", async () => {
      const res = await request(app).put(`/api/users/0`).send(data);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Usuário não encontrado" })
      );
    });

    it("Deve retornar uma mensagem de erro quando passar um formato de dado diferente", async () => {
      const res = await request(app)
        .put(`/api/users/${id}`)
        .send({ ...data, birthDate: "teste" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Problema em atualizar o usuário" })
      );
    });
  });

  describe("Método DELETE", () => {
    it("Deve deletar um usuário", async () => {
      const res = await request(app).delete(`/api/users/${id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Usuário deletado com sucesso" })
      );
    });

    it("Deve retornar uma mensagem de erro quando o usuário não for encontrado", async () => {
      const res = await request(app).delete(`/api/users/0`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({ message: "Problema em deletar o usuário" })
      );
    });
  });
});
