const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres debe traer todos los género", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un género", async () => {
  const createGenre = {
    name: "Romance",
  };
  const res = await request(app).post("/genres").send(createGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(createGenre.name);
});

test("PUT /genres/:id debe actualizar la propiedad name del género", async () => {
  const updateGenre = {
    name: "Acción",
  };
  const res = await request(app).put(`/genres/${id}`).send(updateGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateGenre.name);
});

test("DELETE /genres/:id debe eliminar un género", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
