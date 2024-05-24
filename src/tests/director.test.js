const request = require("supertest");
const app = require("../app");

let id;

test("GET /directors debe traer todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
  const createDirector = {
    firstName: "Fabian",
    lastName: "Ramos",
    nationality: "Colombia",
    image:
      "https://i.pinimg.com/236x/fc/32/74/fc32745a113e995550b129863b303357.jpg",
    birthday: "2003-03-21",
  };
  const res = await request(app).post("/directors").send(createDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(createDirector.firstName);
});

test("PUT /directors/:id debe actualizar 1 o más propiedades de un director", async () => {
  const updateDirector = {
    firstName: "Fabian",
  };
  const res = await request(app).put(`/directors/${id}`).send(updateDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateDirector.firstName);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
